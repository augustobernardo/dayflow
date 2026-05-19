import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet],
  template: `
    <div class="auth-page">
      <div class="auth-container">
        <a routerLink="/" class="auth-back" aria-label="Back to home">
          <span class="material-symbols-outlined">arrow_back</span>
          <span>DayFlow</span>
        </a>

        <router-outlet />
      </div>

      <div class="auth-ambient">
        <div class="auth-ambient-blob ambient-a"></div>
        <div class="auth-ambient-blob ambient-b"></div>
      </div>
    </div>
  `,
  styles: `
    :host { display: block; }
    .auth-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem 1rem; position: relative; background: var(--color-bg-app); }
    .auth-container { width: 100%; max-width: 440px; position: relative; z-index: 1; }
    .auth-back { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.8125rem; font-weight: 500; color: var(--color-text-tertiary); text-decoration: none; padding: 0.375rem 0.75rem; border-radius: var(--radius-md); transition: color 0.15s ease, background 0.15s ease; margin-bottom: 1.5rem; }
    .auth-back:hover { color: var(--color-text-primary); background: var(--color-surface-alt); }
    .auth-back span.material-symbols-outlined { font-size: 1rem; }
    .auth-ambient { position: fixed; inset: 0; pointer-events: none; overflow: hidden; z-index: 0; }
    .auth-ambient-blob { position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.06; }
    .ambient-a { width: 500px; height: 500px; background: var(--color-primary-400); top: -150px; right: -150px; }
    .ambient-b { width: 400px; height: 400px; background: var(--color-primary-600); bottom: -100px; left: -100px; }
  `,
})
export class AuthLayout {}
