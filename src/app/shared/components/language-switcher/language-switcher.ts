import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  HostListener,
} from '@angular/core';
import { TranslationService, SupportedLocale } from '../../../core/i18n';

interface LocaleOption {
  value: SupportedLocale;
  label: string;
  flag: string;
}

const LOCALE_OPTIONS: LocaleOption[] = [
  { value: 'en-US', label: 'English', flag: '🇺🇸' },
  { value: 'pt-BR', label: 'Português', flag: '🇧🇷' },
];

@Component({
  selector: 'app-language-switcher',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'lang-switcher',
  },
  template: `
    <div class="lang-switcher-container">
      <button
        class="lang-trigger"
        i18n-aria-label="@@common.language"
        aria-label="Language"
        [attr.aria-expanded]="open()"
        (click)="toggle()"
      >
        <span class="lang-current-flag">{{ currentOption()?.flag }}</span>
        <span class="lang-current-code">{{ currentOption()?.value === 'en-US' ? 'EN' : 'PT' }}</span>
        <span class="material-symbols-outlined lang-chevron" aria-hidden="true">
          expand_more
        </span>
      </button>
      @if (open()) {
        <ul class="lang-dropdown" role="listbox" aria-label="Language">
          @for (option of options; track option.value) {
            <li role="option" [attr.aria-selected]="option.value === currentOption()?.value">
              <button
                class="lang-option"
                [class.active]="option.value === currentOption()?.value"
                (click)="select(option.value)"
              >
                <span class="lang-option-flag">{{ option.flag }}</span>
                <span class="lang-option-label">{{ option.label }}</span>
                @if (option.value === currentOption()?.value) {
                  <span class="material-symbols-outlined lang-check">check</span>
                }
              </button>
            </li>
          }
        </ul>
      }
    </div>
  `,
  styles: `
    :host {
      position: relative;
      display: inline-block;
    }

    .lang-switcher-container {
      position: relative;
    }

    .lang-trigger {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.375rem 0.625rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      background: var(--color-surface);
      color: var(--color-text-secondary);
      cursor: pointer;
      font-size: 0.8125rem;
      font-family: inherit;
      transition: all 0.15s ease;
    }
    .lang-trigger:hover {
      border-color: var(--color-border-hover);
      background: var(--color-surface-alt);
    }

    .lang-current-flag { font-size: 1rem; line-height: 1; }
    .lang-current-code { font-weight: 500; }

    .lang-chevron {
      font-size: 1rem;
      transition: transform 0.2s ease;
    }

    .lang-dropdown {
      position: absolute;
      top: calc(100% + 0.375rem);
      right: 0;
      min-width: 10rem;
      padding: 0.375rem;
      margin: 0;
      list-style: none;
      background: var(--color-surface-elevated);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      z-index: 100;
      animation: lang-fade-in 0.15s ease;
    }

    @keyframes lang-fade-in {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .lang-option {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      width: 100%;
      padding: 0.5rem 0.625rem;
      border: none;
      background: transparent;
      color: var(--color-text-primary);
      cursor: pointer;
      font-size: 0.8125rem;
      font-family: inherit;
      border-radius: var(--radius-md);
      transition: background 0.1s ease;
    }
    .lang-option:hover {
      background: var(--color-surface-alt);
    }
    .lang-option.active {
      background: rgb(16 185 129 / 0.08);
    }
    .lang-option-flag { font-size: 1rem; line-height: 1; }
    .lang-option-label { flex: 1; text-align: left; }
    .lang-check {
      font-size: 1rem;
      color: var(--color-primary-500);
    }
  `,
})
export class LanguageSwitcherComponent {
  private translationService = inject(TranslationService);

  protected readonly options = LOCALE_OPTIONS;
  protected open = signal(false);

  protected currentOption = signal<LocaleOption | undefined>(
    LOCALE_OPTIONS.find((o) => o.value === this.translationService.currentLocale()),
  );

  toggle(): void {
    this.open.update((v) => !v);
  }

  select(locale: SupportedLocale): void {
    this.translationService.setLocale(locale);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const host = document.querySelector('app-language-switcher');
    if (host && !host.contains(target)) {
      this.open.set(false);
    }
  }
}
