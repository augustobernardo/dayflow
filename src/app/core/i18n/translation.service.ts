import { Injectable, signal } from '@angular/core';
import { loadTranslations } from '@angular/localize';

export type SupportedLocale = 'en-US' | 'pt-BR';

type TranslationMap = Record<string, string>;

const STORAGE_KEY = 'dayflow-locale';

/**
 * Pre-bootstrap helper called from main.ts.
 * Fetches the translation JSON for the given locale and registers
 * it with @angular/localize so all static $localize calls resolve.
 */
export async function initTranslations(locale: SupportedLocale): Promise<TranslationMap> {
  const translations = await fetchTranslations(locale);
  loadTranslations(translations);
  return translations;
}

async function fetchTranslations(locale: SupportedLocale): Promise<TranslationMap> {
  try {
    const response = await fetch(`/assets/i18n/${locale}.json`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  } catch (error) {
    console.error(`Failed to load ${locale} translations:`, error);
    return {};
  }
}

@Injectable({ providedIn: 'root' })
export class TranslationService {
  readonly currentLocale = signal<SupportedLocale>(this.detectInitial());
  private translations = signal<TranslationMap>({});

  get locale(): SupportedLocale {
    return this.currentLocale();
  }

  /**
   * Stores the raw translation map loaded before bootstrap.
   * Used for dynamic interpolation (e.g. email in success messages).
   */
  setTranslations(map: TranslationMap): void {
    this.translations.set(map);
  }

  /**
   * Returns a raw translated string from the loaded map.
   * For static text, prefer `$localize`:@@id:default`` directly in code.
   */
  translate(id: string, params?: Record<string, string | number>): string {
    let text = this.translations()[id] ?? id;
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        text = text.replace(`{${key}}`, String(value));
      }
    }
    return text;
  }

  /**
   * Switches locale by storing preference and reloading the page.
   * On reload, main.ts will load the new locale's translations.
   */
  async setLocale(locale: SupportedLocale): Promise<void> {
    localStorage.setItem(STORAGE_KEY, locale);
    window.location.reload();
  }

  private detectInitial(): SupportedLocale {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'pt-BR' || stored === 'en-US') return stored;
    if (typeof navigator !== 'undefined' && navigator.language?.startsWith('pt')) {
      return 'pt-BR';
    }
    return 'en-US';
  }
}
