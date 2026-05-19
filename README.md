# DayFlow

A modern productivity application built with **Angular v21+**, featuring a clean, minimalist design inspired by Linear, Notion, and Vercel.

## Tech Stack

- **Angular v21.2** — Standalone Components, Signals, Lazy Loading
- **@angular/localize** — Native Angular i18n with runtime `loadTranslations()`
- **Tailwind CSS v4** — CSS-first configuration with design tokens
- **TypeScript 5.9** — Strict mode enabled
- **Vitest** — Unit testing
- **pnpm** — Package manager

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   └── i18n/                    # TranslationService + bootstrap loader
│   ├── shared/
│   │   └── components/              # Reusable UI components
│   │       ├── button/
│   │       ├── input/
│   │       ├── checkbox/
│   │       ├── social-button/
│   │       ├── password-input/
│   │       └── language-switcher/
│   ├── layout/
│   │   └── auth-layout/             # Auth pages layout wrapper
│   ├── components/
│   │   └── landing/                 # Landing page sections
│   │       ├── navbar/
│   │       ├── hero/
│   │       ├── features/
│   │       ├── benefits/
│   │       ├── cta/
│   │       └── footer/
│   ├── pages/
│   │   ├── landing/                 # Landing page assembly
│   │   └── auth/
│   │       ├── login/
│   │       ├── register/
│   │       └── forgot-password/
│   ├── app.config.ts
│   ├── app.routes.ts                # Lazy-loaded routing
│   └── app.ts
├── assets/
│   └── i18n/
│       ├── en-US.json               # English translations (flat key-value)
│       └── pt-BR.json               # Portuguese (Brazil) translations
├── styles.css                       # Tailwind v4 + design tokens
├── main.ts                          # Bootstrap with translation loader
└── index.html                       # Theme init script (prevents FOUC)
```

## Routes

| Path | Page | Lazy Loaded |
|---|---|---|
| `/` | Landing Page | Yes |
| `/auth/login` | Login | Yes |
| `/auth/register` | Register | Yes |
| `/auth/forgot-password` | Forgot Password | Yes |

## Internationalization (i18n)

Uses **`@angular/localize`** with runtime `loadTranslations()`.

### How it works

1. **`main.ts`** detects the locale from localStorage (or browser preference), fetches the corresponding JSON from `assets/i18n/`, and calls `loadTranslations()` before bootstrapping the app.
2. **Templates** use the `i18n="@@id"` attribute with custom IDs. Angular's compiler transforms these into `$localize` calls.
3. **TypeScript code** uses `$localize`:@@id:default text`` tagged templates for dynamic text (form labels, placeholders, etc.).
4. **`TranslationService.translate(id)`** is available for cases where dynamic interpolation is needed (e.g., email in success messages).
5. **Language switching** stores the preference in localStorage and triggers `window.location.reload()`. On reload, `main.ts` loads the new locale's translations.

### Adding new translations

1. Add the key to both `src/assets/i18n/en-US.json` and `pt-BR.json`:
   ```json
   { "landing.hero.title": "Focus through depth." }
   ```
2. In templates, use the `i18n` attribute:
   ```html
   <h1 i18n="@@landing.hero.title">Focus through depth.</h1>
   ```
3. In TypeScript, use `$localize`:
   ```typescript
   readonly label = $localize`:@@landing.hero.title:Focus through depth.`;
   ```

The default English text in source code serves as both the translation ID placeholder and the fallback if translations fail to load.

### Supported Locales

| Code | Language |
|---|---|
| `en-US` | English (default) |
| `pt-BR` | Portuguese (Brazil) |

## Theming

Design tokens in `src/styles.css` use Tailwind v4's `@theme` with CSS custom properties for light/dark modes. Dark mode is controlled by the `dark` class on `<html>`.

- **Colors**: Material Design 3 inspired, emerald green primary
- **Typography**: Inter font family
- **Icons**: Material Symbols (Google Fonts)
- **Glass effects**: `backdrop-filter: blur()` for navbar and cards

## Getting Started

```bash
pnpm install
pnpm start       # http://localhost:4200
pnpm build       # Production build
pnpm test        # Run tests
```

## Future Integration Points

Look for `// TODO:` comments:
- `// TODO: Implement login/register/forgot-password form validation here`
- `// TODO: Integrate authentication API here`
- `// TODO: Integrate social login (OAuth) here`
- `// TODO: Integrate password reset API here`
