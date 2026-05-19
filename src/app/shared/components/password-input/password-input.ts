import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  booleanAttribute,
  signal,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'password-input-wrapper',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true,
    },
  ],
  template: `
    <div class="password-field-group">
      @if (label()) {
        <label [for]="inputId" class="password-label">{{ label() }}</label>
      }
      <div class="password-container" [class.has-error]="!!error()">
        @if (icon()) {
          <span class="password-icon-left material-symbols-outlined">{{ icon() }}</span>
        }
        <input
          [id]="inputId"
          [type]="visible() ? 'text' : 'password'"
          [value]="value"
          [placeholder]="placeholder()"
          [disabled]="disabled()"
          [required]="required()"
          [attr.autocomplete]="autocomplete()"
          class="password-field"
          [class.has-left-icon]="!!icon()"
          (input)="onInput($event)"
          (blur)="onTouched()"
        />
        <button
          type="button"
          class="toggle-visibility"
          [attr.aria-label]="visible() ? 'Hide password' : 'Show password'"
          (click)="toggleVisibility()"
        >
          <span class="material-symbols-outlined">
            {{ visible() ? 'visibility_off' : 'visibility' }}
          </span>
        </button>
      </div>
      @if (error()) {
        <p class="password-error" role="alert">{{ error() }}</p>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    .password-field-group {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
    }

    .password-label {
      font-size: 0.8125rem;
      font-weight: 500;
      color: var(--color-text-secondary);
    }

    .password-container {
      position: relative;
      display: flex;
      align-items: center;
    }

    .password-field {
      width: 100%;
      padding: 0.625rem 2.5rem 0.625rem 0.875rem;
      font-size: 0.875rem;
      font-family: inherit;
      color: var(--color-text-primary);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
      outline: none;
    }

    .password-field::placeholder {
      color: var(--color-text-tertiary);
    }

    .password-field:focus {
      border-color: var(--color-primary-500);
      box-shadow: 0 0 0 3px rgb(16 185 129 / 0.15);
    }

    .password-field:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background: var(--color-surface-alt);
    }

    .has-error .password-field {
      border-color: var(--color-error-500);
    }
    .has-error .password-field:focus {
      box-shadow: 0 0 0 3px rgb(239 68 68 / 0.1);
    }

    .password-field.has-left-icon {
      padding-left: 2.5rem;
    }

    .password-icon-left {
      position: absolute;
      left: 0.75rem;
      font-size: 1.125rem;
      color: var(--color-text-tertiary);
      pointer-events: none;
    }

    .toggle-visibility {
      position: absolute;
      right: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      border: none;
      background: transparent;
      color: var(--color-text-tertiary);
      cursor: pointer;
      border-radius: var(--radius-sm);
      transition: color 0.15s ease;
      padding: 0;
    }
    .toggle-visibility:hover {
      color: var(--color-text-secondary);
    }
    .toggle-visibility span {
      font-size: 1.125rem;
    }

    .password-error {
      font-size: 0.75rem;
      color: var(--color-error-500);
      margin: 0;
    }
  `,
})
export class PasswordInputComponent implements ControlValueAccessor {
  label = input<string>();
  placeholder = input('');
  icon = input<string>();
  error = input<string>();
  disabled = input(false, { transform: booleanAttribute });
  required = input(false, { transform: booleanAttribute });
  autocomplete = input<string>('current-password');

  protected value = '';
  protected visible = signal(false);

  protected inputId = 'password-' + Math.random().toString(36).substring(2, 9);

  private onChange: (value: string) => void = () => {};
  protected onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  protected onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  protected toggleVisibility(): void {
    this.visible.update((v) => !v);
  }
}
