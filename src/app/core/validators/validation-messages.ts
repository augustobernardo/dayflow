export type ValidationMessageFn = (params?: Record<string, unknown>) => string;

export const VALIDATION_MESSAGES: Record<string, ValidationMessageFn> = {
  required: () => $localize`:@@validation.required:This field is required.`,
  email: () => $localize`:@@validation.email:Please enter a valid email address.`,
  minlength: (params) =>
    $localize`:@@validation.minLength:Must be at least ${params?.['requiredLength'] ?? 0} characters.`,
  maxlength: (params) =>
    $localize`:@@validation.maxLength:Must be at most ${params?.['requiredLength'] ?? 0} characters.`,
  passwordMismatch: () => $localize`:@@validation.passwordMismatch:Passwords do not match.`,
  requiredTrue: () => $localize`:@@validation.required:This field is required.`,
};
