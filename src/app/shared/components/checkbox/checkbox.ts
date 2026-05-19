import {
  Component,
  ChangeDetectionStrategy,
  input,
  model,
  output,
  booleanAttribute,
  computed,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"checkbox-wrapper"',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
  template: `
    <label class="checkbox-label" [class.disabled]="disabled()">
      <input
        type="checkbox"
        class="checkbox-native"
        [checked]="checked()"
        [disabled]="disabled()"
        [required]="required()"
        [attr.aria-describedby]="ariaDescribedBy()"
        (change)="toggle()"
        (blur)="onTouched()"
      />
      <span class="checkbox-custom">
        <svg class="checkbox-check" viewBox="0 0 12 10" fill="none" aria-hidden="true">
          <path d="M1 5.5L4.5 9L11 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      @if (label()) {
        <span class="checkbox-text">{{ label() }}</span>
      }
      <ng-content />
    </label>
  `,
  styles: `
    :host {
      display: block;
    }

    .checkbox-label {
      display: inline-flex;
      align-items: flex-start;
      gap: 0.5rem;
      cursor: pointer;
      user-select: none;
    }
    .checkbox-label.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .checkbox-native {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      pointer-events: none;
    }

    .checkbox-custom {
      flex-shrink: 0;
      width: 1.125rem;
      height: 1.125rem;
      border: 1.5px solid var(--color-border);
      border-radius: var(--radius-xs);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
      background: var(--color-surface);
      margin-top: 0.125rem;
    }
    .checkbox-native:focus-visible + .checkbox-custom {
      box-shadow: 0 0 0 3px rgb(16 185 129 / 0.2);
    }
    .checkbox-native:checked + .checkbox-custom {
      background: var(--color-primary-500);
      border-color: var(--color-primary-500);
    }
    .checkbox-native:checked + .checkbox-custom .checkbox-check {
      opacity: 1;
      transform: scale(1);
    }

    .checkbox-check {
      width: 0.625rem;
      height: 0.625rem;
      color: #fff;
      opacity: 0;
      transform: scale(0.5);
      transition: all 0.15s ease;
    }

    .checkbox-text {
      font-size: 0.8125rem;
      color: var(--color-text-secondary);
      line-height: 1.4;
    }
  `,
})
export class CheckboxComponent implements ControlValueAccessor {
  label = input<string>();
  disabled = input(false, { transform: booleanAttribute });
  required = input(false, { transform: booleanAttribute });

  protected checked = model(false);

  ariaDescribedBy = input<string>();
  changed = output<boolean>();
  protected onTouched: () => void = () => {};

  private onChange: (value: boolean) => void = () => {};

  writeValue(value: boolean): void {
    this.checked.set(value ?? false);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  protected toggle(): void {
    if (this.disabled()) return;
    const newValue = !this.checked();
    this.checked.set(newValue);
    this.onChange(newValue);
    this.changed.emit(newValue);
  }
}
