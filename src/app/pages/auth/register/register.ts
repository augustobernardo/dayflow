import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input';
import { PasswordInputComponent } from '../../../shared/components/password-input/password-input';
import { CheckboxComponent } from '../../../shared/components/checkbox/checkbox';
import { ButtonComponent } from '../../../shared/components/button/button';
import { SocialButtonComponent } from '../../../shared/components/social-button/social-button';
import { AuthService } from '../../../services/auth.service';
import { emailFormat, passwordMinLength, passwordMatch } from '../../../core/validators/auth.validators';
import { VALIDATION_MESSAGES } from '../../../core/validators/validation-messages';
import { getFormErrors, markAllTouched, trimFormValues } from '../../../core/validators/form.utils';
import type { RegisterRequest } from '../../../services/auth.models';

type PasswordStrength = '' | 'fair' | 'good' | 'strong';

@Component({
  selector: 'page-register',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ReactiveFormsModule,
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

      <form class="auth-form" [formGroup]="form" (ngSubmit)="onSubmit()" (keydown.enter)="onSubmit()" novalidate>
        @if (apiError()) {
          <div class="form-error" role="alert">{{ apiError() }}</div>
        }

        <app-input
          [label]="nameLabel"
          type="text"
          [placeholder]="namePlaceholder"
          autocomplete="name"
          icon="person"
          formControlName="name"
          [required]="true"
          [error]="formErrors()['name']"
          [attr.aria-invalid]="fieldInvalid('name')"
        />

        <app-input
          [label]="emailLabel"
          type="email"
          [placeholder]="emailPlaceholder"
          autocomplete="email"
          icon="mail"
          formControlName="email"
          [required]="true"
          [error]="formErrors()['email']"
          [attr.aria-invalid]="fieldInvalid('email')"
        />

        <app-password-input
          [label]="passwordLabel"
          [placeholder]="passwordPlaceholder"
          autocomplete="new-password"
          icon="lock"
          formControlName="password"
          [required]="true"
          [error]="formErrors()['password']"
          [attr.aria-invalid]="fieldInvalid('password')"
        />

        @if (passwordControl.value) {
          <div class="password-strength" role="status" [attr.aria-label]="strengthAriaLabel()">
            <div class="strength-bar">
              <span class="strength-segment" [class.active]="strengthLevel() >= 1"></span>
              <span class="strength-segment" [class.active]="strengthLevel() >= 2"></span>
              <span class="strength-segment" [class.active]="strengthLevel() >= 3"></span>
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
          formControlName="confirmPassword"
          [required]="true"
          [error]="formErrors()['confirmPassword']"
          [attr.aria-invalid]="fieldInvalid('confirmPassword')"
        />

        <div class="auth-terms">
          <app-checkbox formControlName="acceptedTerms" [required]="true">
            <span class="terms-text">
              <ng-container i18n="@@auth.register.termsPrefix">I agree to the</ng-container>
              <a href="#" class="auth-link" i18n="@@auth.register.termsLink">Terms of Service</a>
              <ng-container i18n="@@common.and">and</ng-container>
              <a href="#" class="auth-link" i18n="@@auth.register.privacyPolicy">Privacy Policy</a>
            </span>
          </app-checkbox>
        </div>

        <app-button type="submit" size="lg" fullWidth [loading]="submitting()" [disabled]="form.invalid || submitting()">
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
    .auth-link { font-size: 0.8125rem; color: var(--color-primary-500); text-decoration: none; font-weight: 500; transition: color 0.15s ease; }
    .auth-link:hover { color: var(--color-primary-400); }
    .auth-footer-text { text-align: center; font-size: 0.8125rem; color: var(--color-text-tertiary); margin: 1.5rem 0 0; }

    .password-strength { display: flex; flex-direction: column; gap: 0.375rem; }
    .strength-bar { display: flex; gap: 0.25rem; }
    .strength-segment { flex: 1; height: 0.25rem; border-radius: 1rem; background: var(--color-border); transition: background-color 0.2s ease; }
    .strength-segment.active:nth-child(-n+1) { background: #f59e0b; }
    .strength-segment.active:nth-child(-n+2) { background: var(--color-primary-500); }
    .strength-segment.active:nth-child(-n+3) { background: #059669; }
    .strength-label { font-size: 0.75rem; font-weight: 500; transition: color 0.2s ease; }
    .strength-label[data-strength="Fair"] { color: #f59e0b; }
    .strength-label[data-strength="Good"] { color: var(--color-primary-500); }
    .strength-label[data-strength="Strong"] { color: #059669; }
  `,
})
export class RegisterPage {
  private router = inject(Router);
  private authService = inject(AuthService);

  protected form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(100)],
      updateOn: 'blur',
    }),
    email: new FormControl('', {
      validators: [Validators.required, emailFormat()],
      updateOn: 'blur',
    }),
    password: new FormControl('', {
      validators: [Validators.required, passwordMinLength(6)],
      updateOn: 'change',
    }),
    confirmPassword: new FormControl('', {
      validators: [Validators.required, passwordMatch('password')],
      updateOn: 'blur',
    }),
    acceptedTerms: new FormControl(false, {
      validators: [Validators.requiredTrue],
    }),
  });

  protected submitting = signal(false);
  protected apiError = signal('');

  protected formErrors = computed(() => getFormErrors(this.form, VALIDATION_MESSAGES));

  protected passwordControl = this.form.controls.password;

  protected readonly nameLabel = $localize`:@@auth.register.nameLabel:Full name`;
  protected readonly namePlaceholder = $localize`:@@auth.register.namePlaceholder:John Doe`;
  protected readonly emailLabel = $localize`:@@auth.register.emailLabel:Email address`;
  protected readonly emailPlaceholder = $localize`:@@auth.register.emailPlaceholder:you@example.com`;
  protected readonly passwordLabel = $localize`:@@auth.register.passwordLabel:Password`;
  protected readonly passwordPlaceholder = $localize`:@@auth.register.passwordPlaceholder:Create a strong password`;
  protected readonly confirmPasswordLabel = $localize`:@@auth.register.confirmPasswordLabel:Confirm password`;
  protected readonly confirmPasswordPlaceholder = $localize`:@@auth.register.confirmPasswordPlaceholder:Re-enter your password`;

  protected fieldInvalid(field: string): boolean | null {
    const control = this.form.get(field);
    return control ? (control.touched && control.invalid) || null : null;
  }

  protected passwordStrength = computed<PasswordStrength>(() => {
    const pwd = this.passwordControl.value ?? '';
    if (!pwd || pwd.length < 6) return '';
    if (pwd.length < 9) return 'fair';
    if (pwd.length < 13) return 'good';
    return 'strong';
  });

  protected strengthLevel = computed(() => {
    const map: Record<PasswordStrength, number> = { '': 0, fair: 1, good: 2, strong: 3 };
    return map[this.passwordStrength()] ?? 0;
  });

  protected strengthLabel = computed(() => {
    const map: Record<PasswordStrength, string> = {
      '': '',
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

  protected onSubmit(): void {
    if (this.submitting()) return;

    markAllTouched(this.form);
    this.formErrors(); // trigger recomputation

    if (this.form.invalid) return;

    this.apiError.set('');
    this.submitting.set(true);

    const values = trimFormValues<RegisterRequest>(this.form);

    this.authService.register(values).subscribe({
      next: () => {
        queueMicrotask(() => this.router.navigate(['/dashboard']));
      },
      error: (err: { message?: string }) => {
        this.apiError.set(
          err.message || $localize`:@@auth.register.genericError:Registration failed. Please try again.`,
        );
        this.submitting.set(false);
      },
    });
  }

  onSocialRegister(provider: string): void {
    // Social register not yet implemented
  }
}
