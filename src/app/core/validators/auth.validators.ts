import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function emailFormat(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    return EMAIL_REGEX.test(control.value) ? null : { email: true };
  };
}

export function passwordMinLength(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    return control.value.length >= min ? null : { minlength: { requiredLength: min, actualLength: control.value.length } };
  };
}

export function passwordMatch(otherControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const parent = control.parent;
    if (!parent) return null;
    const other = parent.get(otherControlName);
    return other && control.value === other.value ? null : { passwordMismatch: true };
  };
}
