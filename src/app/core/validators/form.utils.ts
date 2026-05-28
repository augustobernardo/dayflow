import { FormGroup } from '@angular/forms';
import type { ValidationMessageFn } from './validation-messages';

export function getFormErrors(
  form: FormGroup,
  messages: Record<string, ValidationMessageFn>,
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const field of Object.keys(form.controls)) {
    const control = form.get(field);
    if (!control || !control.errors || !control.touched) continue;

    for (const [errorKey, errorValue] of Object.entries(control.errors)) {
      const messageFn = messages[errorKey];
      if (messageFn) {
        result[field] = messageFn(errorValue as Record<string, unknown>);
        break;
      }
    }
  }

  return result;
}

export function markAllTouched(form: FormGroup): void {
  Object.values(form.controls).forEach((control) => {
    control.markAsTouched();
    if (control instanceof FormGroup) {
      markAllTouched(control);
    }
  });
}

export function trimFormValues<T>(form: FormGroup): T {
  const raw = form.getRawValue() as Record<string, unknown>;
  const trimmed: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(raw)) {
    trimmed[key] = typeof value === 'string' ? value.trim() : value;
  }
  return trimmed as T;
}
