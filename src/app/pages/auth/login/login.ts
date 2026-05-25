import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input';
import { PasswordInputComponent } from '../../../shared/components/password-input/password-input';
import { CheckboxComponent } from '../../../shared/components/checkbox/checkbox';
import { ButtonComponent } from '../../../shared/components/button/button';
import { SocialButtonComponent } from '../../../shared/components/social-button/social-button';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'page-login',
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
        <h1 class="auth-title" i18n="@@auth.login.title">Welcome back</h1>
        <p class="auth-description" i18n="@@auth.login.description">Sign in to continue to your workspace</p>
      </div>

      <form class="auth-form" (submit)="onSubmit($event)" novalidate>
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
        <!-- TODO: Implement login form validation here -->

        <app-password-input
          [label]="passwordLabel"
          [placeholder]="passwordPlaceholder"
          autocomplete="current-password"
          icon="lock"
          [(ngModel)]="password"
          name="password"
          [required]="true"
        />

        <div class="auth-row">
          <app-checkbox
            [label]="rememberMeLabel"
            [(ngModel)]="rememberMe"
            name="rememberMe"
          />
          <a routerLink="/auth/forgot-password" class="auth-link" i18n="@@auth.login.forgotPassword">
            Forgot your password?
          </a>
        </div>

        <app-button type="submit" size="lg" fullWidth [loading]="submitting()" (click)="onSubmit($event)">
          <ng-container i18n="@@auth.login.submit">Sign In</ng-container>
        </app-button>
        <!-- TODO: Integrate authentication API here -->
      </form>

      <div class="auth-divider">
        <span i18n="@@common.orContinueWith">OR CONTINUE WITH</span>
      </div>

      <div class="auth-social">
        <div class="auth-social-row">
          <app-social-button provider="google" (clicked)="onSocialLogin('google')">
            <ng-container i18n="@@auth.login.continueWithGoogle">Continue with Google</ng-container>
          </app-social-button>
          <app-social-button provider="github" (clicked)="onSocialLogin('github')">
            <ng-container i18n="@@auth.login.continueWithGitHub">Continue with GitHub</ng-container>
          </app-social-button>
        </div>
      </div>

      <p class="auth-footer-text">
        <ng-container i18n="@@auth.login.noAccount">Don't have an account?</ng-container>
        <a routerLink="/auth/register" class="auth-link" i18n="@@auth.login.registerLink">Create one</a>
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
    .auth-row { display: flex; align-items: center; justify-content: space-between; }
    .auth-link { font-size: 0.8125rem; color: var(--color-primary-500); text-decoration: none; font-weight: 500; transition: color 0.15s ease; }
    .auth-link:hover { color: var(--color-primary-400); }
    .auth-footer-text { text-align: center; font-size: 0.8125rem; color: var(--color-text-tertiary); margin: 1.5rem 0 0; }
  `,
})
export class LoginPage {
  private router = inject(Router);
  private authService = inject(AuthService);

  protected email = signal('');
  protected password = signal('');
  protected rememberMe = signal(false);
  protected submitting = signal(false);

  protected readonly emailLabel = $localize`:@@auth.login.emailLabel:Email address`;
  protected readonly emailPlaceholder = $localize`:@@auth.login.emailPlaceholder:you@example.com`;
  protected readonly passwordLabel = $localize`:@@auth.login.passwordLabel:Password`;
  protected readonly passwordPlaceholder = $localize`:@@auth.login.passwordPlaceholder:Enter your password`;
  protected readonly rememberMeLabel = $localize`:@@auth.login.rememberMe:Remember me`;

  // TODO: Implement login form validation here
  onSubmit(event: Event): void {
    event.preventDefault();
    this.submitting.set(true);

    this.authService.login({
      email: this.email().trim().toLowerCase(),
      password: this.password(),
    })
    .subscribe({
      next: () => {
        queueMicrotask(() => this.router.navigate(['/dashboard']));
      },
      error: (err: { message?: string }) => {
        this.submitting.set(false);
      }
    });
  }

  onSocialLogin(provider: string): void {
    // TODO: Integrate social login (OAuth) here
    console.log('Social login with:', provider);
  }
}
