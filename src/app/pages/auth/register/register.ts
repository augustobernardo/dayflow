import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input';
import { PasswordInputComponent } from '../../../shared/components/password-input/password-input';
import { CheckboxComponent } from '../../../shared/components/checkbox/checkbox';
import { ButtonComponent } from '../../../shared/components/button/button';
import { SocialButtonComponent } from '../../../shared/components/social-button/social-button';
import { AuthService } from '../../../services/auth.service';

type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong' | '';

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
      </div>

      <form class="auth-form" (submit)="onSubmit($event)" novalidate>
        @if (apiError()) {
          <div class="form-error" role="alert">
            {{ apiError() }}
          </div>
        }

        <app-input
          [label]="nameLabel"
          type="text"
          [placeholder]="namePlaceholder"
          autocomplete="name"
          icon="person"
          [(ngModel)]="name"
          name="name"
          [required]="true"
          [error]="nameError()"
          (focusout)="onFieldFocusout('name')"
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
          [error]="emailError()"
          (focusout)="onFieldFocusout('email')"
        />

        <app-password-input
          [label]="passwordLabel"
          [placeholder]="passwordPlaceholder"
          autocomplete="new-password"
          icon="lock"
          [(ngModel)]="password"
          name="password"
          [required]="true"
          [error]="passwordError()"
          (focusout)="onFieldFocusout('password')"
        />

        @if (password()) {
          <div class="password-strength" role="status" [attr.aria-label]="strengthAriaLabel()">
            <div class="strength-bar">
              <span class="strength-segment" [class.active]="strengthLevel() >= 1" [attr.data-level]="strengthLevel()"></span>
              <span class="strength-segment" [class.active]="strengthLevel() >= 2" [attr.data-level]="strengthLevel()"></span>
              <span class="strength-segment" [class.active]="strengthLevel() >= 3" [attr.data-level]="strengthLevel()"></span>
              <span class="strength-segment" [class.active]="strengthLevel() >= 4" [attr.data-level]="strengthLevel()"></span>
            </div>
            <span class="strength-label" [attr.data-strength]="strengthLabel()">
              {{ strengthLabel() }}
            </span>
          </div>
        }

        <app-password-input
          [label]="confirmPasswordLabel"
          [placeholder]="confirmPasswordPlaceholder"
          autocomplete="new-password"
          icon="lock"
          [(ngModel)]="confirmPassword"
          name="confirmPassword"
          [required]="true"
          [error]="confirmPasswordError()"
          (focusout)="onFieldFocusout('confirmPassword')"
        />

        <div class="auth-terms">
          <app-checkbox [(ngModel)]="acceptedTerms" name="acceptedTerms" [required]="true">
            <span class="terms-text">
              <ng-container i18n="@@auth.register.termsPrefix">I agree to the</ng-container>
              <a href="#" class="auth-link" i18n="@@auth.register.termsLink">Terms of Service</a>
              <ng-container i18n="@@common.and">and</ng-container>
              <a href="#" class="auth-link" i18n="@@auth.register.privacyPolicy">Privacy Policy</a>
            </span>
          </app-checkbox>
          @if (termsTouched() && termsError()) {
            <p class="terms-error" role="alert">{{ termsError() }}</p>
          }
        </div>

        <app-button type="submit" size="lg" fullWidth [loading]="submitting()" (click)="onSubmit($event)" [disabled]="submitting() || !isValid()">
          <ng-container i18n="@@auth.register.submit">Create Account</ng-container>
        </app-button>
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
    .form-error { font-size: 0.8125rem; color: var(--color-error-500); background: rgb(239 68 68 / 0.08); border: 1px solid rgb(239 68 68 / 0.2); border-radius: var(--radius-md); padding: 0.75rem 1rem; text-align: center; line-height: 1.4; }
    .auth-terms { margin: 0; }
    .terms-text { font-size: 0.8125rem; color: var(--color-text-tertiary); line-height: 1.4; }
    .terms-error { font-size: 0.75rem; color: var(--color-error-500); margin: 0.375rem 0 0 0; }
    .auth-link { font-size: 0.8125rem; color: var(--color-primary-500); text-decoration: none; font-weight: 500; transition: color 0.15s ease; }
    .auth-link:hover { color: var(--color-primary-400); }
    .auth-footer-text { text-align: center; font-size: 0.8125rem; color: var(--color-text-tertiary); margin: 1.5rem 0 0; }

    .password-strength { display: flex; flex-direction: column; gap: 0.375rem; }
    .strength-bar { display: flex; gap: 0.25rem; }
    .strength-segment { flex: 1; height: 0.25rem; border-radius: 1rem; background: var(--color-border); transition: background-color 0.2s ease; }
    .strength-segment.active[data-level="1"] { background: var(--color-error-500); }
    .strength-segment.active[data-level="2"] { background: #f59e0b; }
    .strength-segment.active[data-level="3"] { background: var(--color-primary-500); }
    .strength-segment.active[data-level="4"] { background: #059669; }
    .strength-label { font-size: 0.75rem; font-weight: 500; transition: color 0.2s ease; }
    .strength-label[data-strength="Weak"] { color: var(--color-error-500); }
    .strength-label[data-strength="Fair"] { color: #f59e0b; }
    .strength-label[data-strength="Good"] { color: var(--color-primary-500); }
    .strength-label[data-strength="Strong"] { color: #059669; }
  `,
})
export class RegisterPage {
  private router = inject(Router);
  private authService = inject(AuthService);

  protected name = signal('');
  protected email = signal('');
  protected password = signal('');
  protected confirmPassword = signal('');
  protected acceptedTerms = signal(false);
  protected submitting = signal(false);
  protected apiError = signal('');

  protected nameTouched = signal(false);
  protected emailTouched = signal(false);
  protected passwordTouched = signal(false);
  protected confirmPasswordTouched = signal(false);
  protected termsTouched = signal(false);

  protected readonly nameLabel = $localize`:@@auth.register.nameLabel:Full name`;
  protected readonly namePlaceholder = $localize`:@@auth.register.namePlaceholder:John Doe`;
  protected readonly emailLabel = $localize`:@@auth.register.emailLabel:Email address`;
  protected readonly emailPlaceholder = $localize`:@@auth.register.emailPlaceholder:you@example.com`;
  protected readonly passwordLabel = $localize`:@@auth.register.passwordLabel:Password`;
  protected readonly passwordPlaceholder = $localize`:@@auth.register.passwordPlaceholder:Create a strong password`;
  protected readonly confirmPasswordLabel = $localize`:@@auth.register.confirmPasswordLabel:Confirm password`;
  protected readonly confirmPasswordPlaceholder = $localize`:@@auth.register.confirmPasswordPlaceholder:Re-enter your password`;

  protected nameError = computed(() => {
    if (!this.nameTouched()) return '';
    const value = this.name().trim();
    if (!value) return $localize`:@@auth.register.validation.nameRequired:Name is required.`;
    if (value.length < 2) return $localize`:@@auth.register.validation.nameMinLength:Name must be at least 2 characters.`;
    if (value.length > 100) return $localize`:@@auth.register.validation.nameMaxLength:Name must be at most 100 characters.`;
    if (/[0-9]/.test(value)) return $localize`:@@auth.register.validation.nameNoNumbers:Name should not contain numbers.`;
    return '';
  });

  protected emailError = computed(() => {
    if (!this.emailTouched()) return '';
    const value = this.email().trim();
    if (!value) return $localize`:@@auth.register.validation.emailRequired:Email is required.`;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return $localize`:@@auth.register.validation.emailInvalid:Please enter a valid email address.`;
    return '';
  });

  protected passwordError = computed(() => {
    if (!this.passwordTouched()) return '';
    const pwd = this.password();
    if (!pwd) return $localize`:@@auth.register.validation.passwordRequired:Password is required.`;
    if (pwd.length < 6) return $localize`:@@auth.register.validation.passwordMinLength:Password must be at least 6 characters.`;
    return '';
  });

  protected confirmPasswordError = computed(() => {
    if (!this.confirmPasswordTouched()) return '';
    const value = this.confirmPassword();
    if (!value) return $localize`:@@auth.register.validation.confirmPasswordRequired:Please confirm your password.`;
    if (value !== this.password()) return $localize`:@@auth.register.validation.passwordsMismatch:Passwords do not match.`;
    return '';
  });

  protected termsError = computed(() => {
    if (!this.termsTouched()) return '';
    if (!this.acceptedTerms()) return $localize`:@@auth.register.validation.termsRequired:You must accept the terms to continue.`;
    return '';
  });

  protected isValid = computed(() =>
    !this.nameError() &&
    !this.emailError() &&
    !this.passwordError() &&
    !this.confirmPasswordError() &&
    !this.termsError() &&
    this.acceptedTerms(),
  );

  protected passwordStrength = computed<PasswordStrength>(() => {
    const pwd = this.password();
    if (!pwd) return '';

    const checks = [
      pwd.length >= 6,
      /[a-z]/.test(pwd),
      /[A-Z]/.test(pwd),
      /\d/.test(pwd),
      /[^a-zA-Z0-9]/.test(pwd),
    ];
    const passed = checks.filter(Boolean).length;

    if (pwd.length < 6) return 'weak';
    if (passed <= 2) return 'weak';
    if (passed === 3) return 'fair';
    if (passed === 4) return 'good';
    return 'strong';
  });

  protected strengthLevel = computed(() => {
    const map: Record<PasswordStrength, number> = { '': 0, weak: 1, fair: 2, good: 3, strong: 4 };
    return map[this.passwordStrength()] ?? 0;
  });

  protected strengthLabel = computed(() => {
    const map: Record<PasswordStrength, string> = {
      '': '',
      weak: $localize`:@@auth.register.strength.weak:Weak`,
      fair: $localize`:@@auth.register.strength.fair:Fair`,
      good: $localize`:@@auth.register.strength.good:Good`,
      strong: $localize`:@@auth.register.strength.strong:Strong`,
    };
    return map[this.passwordStrength()] ?? '';
  });

  protected strengthAriaLabel = computed(() => {
    const label = this.strengthLabel();
    return label ? $localize`:@@auth.register.strength.ariaLabel:Password strength: ${label}` : '';
  });

  protected onFieldFocusout(field: string): void {
    this.apiError.set('');
    switch (field) {
      case 'name': this.nameTouched.set(true); break;
      case 'email': this.emailTouched.set(true); break;
      case 'password': this.passwordTouched.set(true); break;
      case 'confirmPassword': this.confirmPasswordTouched.set(true); break;
    }
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();
    this.apiError.set('');
    this.nameTouched.set(true);
    this.emailTouched.set(true);
    this.passwordTouched.set(true);
    this.confirmPasswordTouched.set(true);
    this.termsTouched.set(true);

    if (!this.isValid()) return;

    this.submitting.set(true);

    this.authService
      .register({
        name: this.name().trim(),
        email: this.email().trim().toLowerCase(),
        password: this.password(),
      })
      .subscribe({
        next: () => {
          queueMicrotask(() => this.router.navigate(['/']));
        },
        error: (err: { message?: string }) => {
          this.apiError.set($localize`:@@auth.register.genericError:Registration failed. Please try again.`);
          this.submitting.set(false);
        },
      });
  }

  onSocialRegister(provider: string): void {
    console.log('Social register with:', provider);
  }
}
