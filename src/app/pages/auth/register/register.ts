import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input';
import { PasswordInputComponent } from '../../../shared/components/password-input/password-input';
import { CheckboxComponent } from '../../../shared/components/checkbox/checkbox';
import { ButtonComponent } from '../../../shared/components/button/button';
import { SocialButtonComponent } from '../../../shared/components/social-button/social-button';

@Component({
  selector: 'page-register',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    FormsModule,
    InputComponent,
    PasswordInputComponent,
    CheckboxComponent,
    ButtonComponent,
    SocialButtonComponent,
  ],
  template: `
    <div class="auth-card">
      <div class="auth-header">
        <h1 class="auth-title" i18n="@@auth.register.title">Create your account</h1>
        <p class="auth-description" i18n="@@auth.register.description">Start your free 14-day trial. No credit card required.</p>
      </div>

      <form class="auth-form" (submit)="onSubmit($event)" novalidate>
        <app-input
          [label]="nameLabel"
          type="text"
          [placeholder]="namePlaceholder"
          autocomplete="name"
          icon="person"
          [(ngModel)]="name"
          name="name"
          [required]="true"
        />

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

        <app-password-input
          [label]="passwordLabel"
          [placeholder]="passwordPlaceholder"
          autocomplete="new-password"
          icon="lock"
          [(ngModel)]="password"
          name="password"
          [required]="true"
        />

        <app-password-input
          [label]="confirmPasswordLabel"
          [placeholder]="confirmPasswordPlaceholder"
          autocomplete="new-password"
          icon="lock"
          [(ngModel)]="confirmPassword"
          name="confirmPassword"
          [required]="true"
        />
        <!-- TODO: Implement register form validation here -->

        <div class="auth-terms">
          <app-checkbox [(ngModel)]="acceptedTerms" name="acceptedTerms" [required]="true">
            <span class="terms-text">
              <ng-container i18n="@@auth.register.termsPrefix">I agree to the</ng-container>
              <a href="#" class="auth-link" i18n="@@auth.register.termsLink">Terms of Service</a>
              <ng-container i18n="@@common.and">and</ng-container>
              <a href="#" class="auth-link" i18n="@@auth.register.privacyPolicy">Privacy Policy</a>
            </span>
          </app-checkbox>
        </div>

        <app-button type="submit" size="lg" fullWidth [loading]="submitting()">
          <ng-container i18n="@@auth.register.submit">Create Account</ng-container>
        </app-button>
        <!-- TODO: Integrate authentication API here -->
      </form>

      <div class="auth-divider">
        <span i18n="@@common.orContinueWith">OR CONTINUE WITH</span>
      </div>

      <div class="auth-social">
        <div class="auth-social-row">
          <app-social-button provider="google" (clicked)="onSocialRegister('google')">
            <ng-container i18n="@@auth.register.continueWithGoogle">Continue with Google</ng-container>
          </app-social-button>
          <app-social-button provider="github" (clicked)="onSocialRegister('github')">
            <ng-container i18n="@@auth.register.continueWithGitHub">Continue with GitHub</ng-container>
          </app-social-button>
        </div>
      </div>

      <p class="auth-footer-text">
        <ng-container i18n="@@auth.register.hasAccount">Already have an account?</ng-container>
        <a routerLink="/auth/login" class="auth-link" i18n="@@auth.register.loginLink">Sign in</a>
      </p>
    </div>
  `,
  styles: `
    :host { display: block; }
    .auth-card { background: var(--color-surface-elevated); border: 1px solid var(--color-border); border-radius: var(--radius-2xl); padding: 2.75rem; box-shadow: var(--shadow-lg); }
    @media (max-width: 480px) { .auth-card { padding: 1.5rem; border-radius: var(--radius-xl); } }
    .auth-header { text-align: center; margin-bottom: 1.75rem; }
    .auth-title { font-size: 1.5rem; font-weight: 700; letter-spacing: -0.02em; color: var(--color-text-primary); margin: 0 0 0.375rem; }
    .auth-description { font-size: 0.875rem; color: var(--color-text-tertiary); margin: 0; }
    .auth-social { margin-top: 0.25rem; }
    .auth-social-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
    @media (max-width: 400px) { .auth-social-row { grid-template-columns: 1fr; } }
    .auth-divider { display: flex; align-items: center; gap: 1rem; margin: 2rem 0; }
    .auth-divider::before, .auth-divider::after { content: ''; flex: 1; height: 1px; background: rgb(128 128 128 / 0.25); }
    .auth-divider span { font-size: 0.6875rem; color: var(--color-text-tertiary); font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; white-space: nowrap; }
    .auth-form { display: flex; flex-direction: column; gap: 1.125rem; margin-bottom: 1.25rem; }
    .auth-terms { margin: 0; }
    .terms-text { font-size: 0.8125rem; color: var(--color-text-tertiary); line-height: 1.4; }
    .auth-link { font-size: 0.8125rem; color: var(--color-primary-500); text-decoration: none; font-weight: 500; transition: color 0.15s ease; }
    .auth-link:hover { color: var(--color-primary-400); }
    .auth-footer-text { text-align: center; font-size: 0.8125rem; color: var(--color-text-tertiary); margin: 1.5rem 0 0; }
  `,
})
export class RegisterPage {
  private router = inject(Router);

  protected name = signal('');
  protected email = signal('');
  protected password = signal('');
  protected confirmPassword = signal('');
  protected acceptedTerms = signal(false);
  protected submitting = signal(false);

  protected readonly nameLabel = $localize`:@@auth.register.nameLabel:Full name`;
  protected readonly namePlaceholder = $localize`:@@auth.register.namePlaceholder:John Doe`;
  protected readonly emailLabel = $localize`:@@auth.register.emailLabel:Email address`;
  protected readonly emailPlaceholder = $localize`:@@auth.register.emailPlaceholder:you@example.com`;
  protected readonly passwordLabel = $localize`:@@auth.register.passwordLabel:Password`;
  protected readonly passwordPlaceholder = $localize`:@@auth.register.passwordPlaceholder:Create a strong password`;
  protected readonly confirmPasswordLabel = $localize`:@@auth.register.confirmPasswordLabel:Confirm password`;
  protected readonly confirmPasswordPlaceholder = $localize`:@@auth.register.confirmPasswordPlaceholder:Re-enter your password`;

  // TODO: Implement register form validation here
  onSubmit(event: Event): void {
    event.preventDefault();
    this.submitting.set(true);
    // TODO: Integrate authentication API here
    setTimeout(() => {
      this.submitting.set(false);
      console.log('Register submit:', { name: this.name(), email: this.email(), acceptedTerms: this.acceptedTerms() });
    }, 1500);
  }

  onSocialRegister(provider: string): void {
    // TODO: Integrate social login (OAuth) here
    console.log('Social register with:', provider);
  }
}
