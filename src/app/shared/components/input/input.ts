import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  model,
  booleanAttribute,
  signal,
  computed,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'input-wrapper',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  template: `
    <div class="input-field-group">
      @if (label()) {
        <label [for]="inputId()" class="input-label">{{ label() }}</label>
      }
      <div class="input-container" [class.has-error]="!!error()">
        @if (icon()) {
          <span class="input-icon-left material-symbols-outlined">{{ icon() }}</span>
        }
        <input
          [id]="inputId()"
          [type]="type()"
          [value]="value"
          [placeholder]="placeholder()"
          [disabled]="disabled()"
          [required]="required()"
          [attr.autocomplete]="autocomplete()"
          class="input-field"
          [class.has-left-icon]="!!icon()"
          [class.has-right-icon]="!!suffixIcon()"
          (input)="onInput($event)"
          (blur)="onTouched()"
        />
        @if (suffixIcon()) {
          <button
            type="button"
            class="input-icon-right"
            [attr.aria-label]="suffixLabel()"
            (click)="onSuffixClick()"
          >
            <span class="material-symbols-outlined">{{ suffixIcon() }}</span>
          </button>
        }
      </div>
      @if (error()) {
        <p class="input-error" role="alert">{{ error() }}</p>
      }
      @if (hint() && !error()) {
        <p class="input-hint">{{ hint() }}</p>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    .input-field-group {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
    }

    .input-label {
      font-size: 0.8125rem;
      font-weight: 500;
      color: var(--color-text-secondary);
    }

    .input-container {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-field {
      width: 100%;
      padding: 0.625rem 0.875rem;
      font-size: 0.875rem;
      font-family: inherit;
      color: var(--color-text-primary);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
      outline: none;
    }

    .input-field::placeholder {
      color: var(--color-text-tertiary);
    }

    .input-field:focus {
      border-color: var(--color-primary-500);
      box-shadow: 0 0 0 3px rgb(16 185 129 / 0.15);
    }

    .input-field:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background: var(--color-surface-alt);
    }

    .has-error .input-field {
      border-color: var(--color-error-500);
    }
    .has-error .input-field:focus {
      box-shadow: 0 0 0 3px rgb(239 68 68 / 0.1);
    }

    .input-field.has-left-icon {
      padding-left: 2.5rem;
    }
    .input-field.has-right-icon {
      padding-right: 2.5rem;
    }

    .input-icon-left {
      position: absolute;
      left: 0.75rem;
      font-size: 1.125rem;
      color: var(--color-text-tertiary);
      pointer-events: none;
    }

    .input-icon-right {
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
    .input-icon-right:hover {
      color: var(--color-text-secondary);
    }
    .input-icon-right span {
      font-size: 1.125rem;
    }

    .input-error {
      font-size: 0.75rem;
      color: var(--color-error-500);
      margin: 0;
    }
    .input-hint {
      font-size: 0.75rem;
      color: var(--color-text-tertiary);
      margin: 0;
    }
  `,
})
export class InputComponent implements ControlValueAccessor {
  label = input<string>();
  type = input<string>('text');
  placeholder = input('');
  icon = input<string>();
  suffixIcon = input<string>();
  suffixLabel = input<string>();
  hint = input<string>();
  error = input<string>();
  disabled = input(false, { transform: booleanAttribute });
  required = input(false, { transform: booleanAttribute });
  autocomplete = input<string>('off');

  identity = input('input-' + Math.random().toString(36).substring(2, 9));
  suffixClicked = output<void>();

  protected value = '';
  protected inputId = computed(() => this.identity());

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

  setDisabledState(isDisabled: boolean): void {
    // handled via input signal
  }

  protected onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  protected onSuffixClick(): void {
    this.suffixClicked.emit();
  }
}
