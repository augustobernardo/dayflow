/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import {
  initTranslations,
  TranslationService,
  SupportedLocale,
} from './app/core/i18n';

(async () => {
  const locale = detectLocale();
  const translations = await initTranslations(locale);

  const appRef = await bootstrapApplication(App, appConfig);
  const translationService = appRef.injector.get(TranslationService);
  translationService.setTranslations(translations);
})().catch((err) => console.error(err));

function detectLocale(): SupportedLocale {
  const stored = localStorage.getItem('dayflow-locale');
  if (stored === 'pt-BR' || stored === 'en-US') return stored;
  if (navigator.language?.startsWith('pt')) return 'pt-BR';
  return 'en-US';
}
