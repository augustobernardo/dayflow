import { Component, ChangeDetectionStrategy, input, output, booleanAttribute, inject, ElementRef } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[attr.disabled]': 'disabled() || loading() ? true : null',
    '[attr.aria-disabled]': 'disabled() || loading()',
    '[attr.type]': 'type()',
    '(click)': 'onClick($event)',
  },
  template: `
    @if (loading()) {
      <span class="spinner" aria-hidden="true"></span>
    }
    <span [class.invisible]="loading()">
      <ng-content />
    </span>
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-weight: 500;
      border-radius: var(--radius-lg);
      cursor: pointer;
      transition: all 0.15s ease;
      border: none;
      white-space: nowrap;
      user-select: none;
      position: relative;
      text-decoration: none;
    }
    :host:disabled,
    :host[aria-disabled="true"] {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Sizes */
    :host(.btn-sm) { padding: 0.5rem 0.875rem; font-size: 0.8125rem; }
    :host(.btn-md) { padding: 0.625rem 1.25rem; font-size: 0.875rem; }
    :host(.btn-lg) { padding: 0.75rem 1.5rem; font-size: 0.9375rem; }

    /* Primary */
    :host(.btn-primary) {
      background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
      color: #fff;
      box-shadow: 0 1px 3px rgb(16 185 129 / 0.3), 0 0 0 0 rgb(16 185 129 / 0);
    }
    :host(.btn-primary:hover:not(:disabled)) {
      box-shadow: 0 4px 12px rgb(16 185 129 / 0.35), 0 0 20px rgb(16 185 129 / 0.1);
      transform: translateY(-1px);
    }
    :host(.btn-primary:active:not(:disabled)) {
      transform: translateY(0);
      box-shadow: 0 1px 3px rgb(16 185 129 / 0.3);
    }

    /* Secondary */
    :host(.btn-secondary) {
      background: var(--color-surface);
      color: var(--color-text-primary);
      border: 1px solid var(--color-border);
      box-shadow: var(--shadow-sm);
    }
    :host(.btn-secondary:hover:not(:disabled)) {
      border-color: var(--color-border-hover);
      background: var(--color-surface-alt);
      box-shadow: var(--shadow-md);
    }

    /* Ghost */
    :host(.btn-ghost) {
      background: transparent;
      color: var(--color-text-secondary);
    }
    :host(.btn-ghost:hover:not(:disabled)) {
      background: var(--color-surface-alt);
      color: var(--color-text-primary);
    }

    /* Spinner */
    .spinner {
      width: 1rem;
      height: 1rem;
      border: 2px solid transparent;
      border-top-color: currentColor;
      border-radius: 50%;
      animation: btn-spin 0.6s linear infinite;
      position: absolute;
    }
    .invisible { visibility: hidden; }

    @keyframes btn-spin {
      to { transform: rotate(360deg); }
    }
  `,
})
export class ButtonComponent {
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  disabled = input(false, { transform: booleanAttribute });
  loading = input(false, { transform: booleanAttribute });
  fullWidth = input(false, { transform: booleanAttribute });
  type = input<'button' | 'submit' | 'reset'>('button');

  clicked = output<Event>();

  private elementRef = inject(ElementRef<HTMLElement>);

  protected hostClasses(): string {
    const classes = [
      `btn-${this.variant()}`,
      `btn-${this.size()}`,
    ];
    if (this.fullWidth()) {
      classes.push('w-full');
    }
    return classes.join(' ');
  }

  protected onClick(event: Event): void {
    if (this.disabled() || this.loading()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.clicked.emit(event);

    if (this.type() === 'submit') {
      this.elementRef.nativeElement
        .closest('form')
        ?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    }
  }
}
