import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input';
import { ButtonComponent } from '../../../shared/components/button/button';
import { TranslationService } from '../../../core/i18n';

@Component({
  selector: 'page-forgot-password',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, FormsModule, InputComponent, ButtonComponent],
  template: `
    <div class="auth-card">
      @if (!sent()) {
        <div class="auth-header">
          <h1 class="auth-title" i18n="@@auth.forgotPassword.title">Reset your password</h1>
          <p class="auth-description" i18n="@@auth.forgotPassword.description">
            Enter your email and we'll send you a reset link.
          </p>
        </div>

        <form class="auth-form" (submit)="onSubmit($event)" (keydown.enter)="onSubmit($event)" novalidate>
          <app-input
            [label]="emailLabel"
            type="email"
            [placeholder]="emailPlaceholder"
            autocomplete="email"
            icon="mail"
            [(ngModel)]="email"
            name="email"
            [required]="true"
          />
          <!-- TODO: Implement forgot password validation here -->

          <app-button type="submit" size="lg" fullWidth [loading]="submitting()">
            <ng-container i18n="@@auth.forgotPassword.submit">Send Reset Link</ng-container>
          </app-button>
          <!-- TODO: Integrate password reset API here -->
        </form>

        <p class="auth-footer-text">
          <a routerLink="/auth/login" class="auth-link">
            <span class="material-symbols-outlined auth-back-icon">arrow_back</span>
            <ng-container i18n="@@auth.forgotPassword.backToLogin">Back to Sign In</ng-container>
          </a>
        </p>
      } @else {
        <div class="auth-success">
          <div class="success-icon-wrapper">
            <span class="material-symbols-outlined success-icon">mail</span>
          </div>
          <h2 class="auth-title" i18n="@@auth.forgotPassword.comingSoon.title">Coming Soon</h2>
          <p class="auth-description success-description">{{ comingSoonMessage }}</p>
          <div class="success-actions">
            <a routerLink="/auth/login" class="auth-link" i18n="@@auth.forgotPassword.backToLogin">Back to Sign In</a>
          </div>
        </div>
      }
    </div>
  `,
  styles: `
    :host { display: block; }
    .auth-card { background: var(--color-surface-elevated); border: 1px solid var(--color-border); border-radius: var(--radius-2xl); padding: 2.5rem; box-shadow: var(--shadow-lg); }
    @media (max-width: 480px) { .auth-card { padding: 1.5rem; border-radius: var(--radius-xl); } }
    .auth-header { text-align: center; margin-bottom: 1.5rem; }
    .auth-title { font-size: 1.5rem; font-weight: 700; letter-spacing: -0.02em; color: var(--color-text-primary); margin: 0 0 0.375rem; }
    .auth-description { font-size: 0.875rem; color: var(--color-text-tertiary); margin: 0; }
    .auth-form { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.25rem; }
    .auth-link { display: inline-flex; align-items: center; gap: 0.375rem; font-size: 0.8125rem; color: var(--color-primary-500); text-decoration: none; font-weight: 500; transition: color 0.15s ease; }
    .auth-link:hover { color: var(--color-primary-400); }
    .auth-back-icon { font-size: 1rem; }
    .auth-footer-text { text-align: center; margin: 0; }

    .auth-success { text-align: center; }
    .success-icon-wrapper { display: flex; align-items: center; justify-content: center; width: 4rem; height: 4rem; border-radius: 50%; background: rgb(16 185 129 / 0.08); margin: 0 auto 1.25rem; }
    .success-icon { font-size: 2rem; color: var(--color-primary-500); }
    .success-description { margin-bottom: 1.5rem; }
    .success-actions { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; }
    .auth-link-resend { background: none; border: none; font-size: 0.8125rem; color: var(--color-text-tertiary); cursor: pointer; font-family: inherit; padding: 0; transition: color 0.15s ease; }
    .auth-link-resend:hover { color: var(--color-text-primary); }
  `,
})
export class ForgotPasswordPage {
  private router = inject(Router);
  private translationService = inject(TranslationService);

  protected email = signal('');
  protected submitting = signal(false);
  protected sent = signal(false);

  protected readonly emailLabel = $localize`:@@auth.forgotPassword.emailLabel:Email address`;
  protected readonly emailPlaceholder = $localize`:@@auth.forgotPassword.emailPlaceholder:you@example.com`;

  protected successMessage(): string {
    return this.translationService.translate('auth.forgotPassword.success.description', {
      email: this.email(),
    });
  }

  protected readonly comingSoonMessage = $localize`:@@auth.forgotPassword.comingSoon:Password reset is not available yet. Please contact support for assistance.`;

  onSubmit(event: Event): void {
    event.preventDefault();
    this.submitting.set(false);
    this.sent.set(true);
  }

  resend(): void {
    // not implemented
  }
}
