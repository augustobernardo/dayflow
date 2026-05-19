import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button';

@Component({
  selector: 'landing-cta',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent],
  template: `
    <section id="cta" class="cta-section">
      <div class="cta-inner">
        <div class="cta-card">
          <div class="cta-content">
            <h2 class="cta-title" i18n="@@landing.cta.title">Ready to reclaim your focus?</h2>
            <p class="cta-description" i18n="@@landing.cta.description">
              Join thousands of professionals who've transformed their workflow with DayFlow.
            </p>
            <div class="cta-actions">
              <app-button size="lg" (clicked)="navigate()">
                <span i18n="@@landing.cta.button">Get started free</span>
              </app-button>
              <p class="cta-note" i18n="@@landing.cta.noCC">No credit card required. 14-day free trial.</p>
            </div>
          </div>
          <div class="cta-visual">
            <div class="cta-illustration">
              <div class="illus-grid">
                @for (i of [1, 2, 3, 4, 5, 6]; track i) {
                  <div class="illus-cell" [style.animation-delay.ms]="i * 100"></div>
                }
              </div>
              <div class="illus-accent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }
    .cta-section { padding: 3rem 1.5rem 5rem; }
    .cta-inner { max-width: 1280px; margin: 0 auto; }
    .cta-card {
      display: flex;
      align-items: center;
      gap: 3rem;
      padding: 3.5rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-2xl);
      background: var(--color-surface);
      position: relative;
      overflow: hidden;
    }
    @media (max-width: 768px) { .cta-card { flex-direction: column; padding: 2rem; } }
    .cta-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgb(16 185 129 / 0.03) 0%, transparent 50%);
      pointer-events: none;
    }
    .cta-content { flex: 1; position: relative; z-index: 1; }
    .cta-title { font-size: 2rem; font-weight: 700; letter-spacing: -0.02em; color: var(--color-text-primary); margin: 0 0 0.75rem; }
    @media (max-width: 640px) { .cta-title { font-size: 1.5rem; } }
    .cta-description { font-size: 1rem; color: var(--color-text-secondary); margin: 0 0 1.5rem; max-width: 480px; line-height: 1.6; }
    .cta-actions { display: flex; flex-direction: column; align-items: flex-start; gap: 0.75rem; }
    .cta-note { font-size: 0.75rem; color: var(--color-text-tertiary); margin: 0; }
    .cta-visual { flex-shrink: 0; display: none; }
    @media (min-width: 769px) { .cta-visual { display: block; } }
    .cta-illustration { position: relative; width: 180px; height: 180px; }
    .illus-grid { display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 1fr); gap: 0.5rem; width: 100%; height: 100%; }
    .illus-cell {
      border-radius: var(--radius-md);
      background: linear-gradient(135deg, rgb(16 185 129 / 0.15), rgb(16 185 129 / 0.05));
      border: 1px solid rgb(16 185 129 / 0.08);
      animation: cell-pulse 3s ease-in-out infinite;
    }
    @keyframes cell-pulse { 0%, 100% { opacity: 0.4; transform: scale(0.95); } 50% { opacity: 1; transform: scale(1); } }
    .illus-accent {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 3rem;
      height: 3rem;
      border-radius: var(--radius-full);
      background: linear-gradient(135deg, var(--color-primary-400), var(--color-primary-600));
      box-shadow: 0 0 40px rgb(16 185 129 / 0.3);
      animation: accent-glow 2s ease-in-out infinite alternate;
    }
    @keyframes accent-glow { from { box-shadow: 0 0 20px rgb(16 185 129 / 0.2); } to { box-shadow: 0 0 40px rgb(16 185 129 / 0.4); } }
  `,
})
export class CtaLandingComponent {
  private router = inject(Router);

  navigate(): void {
    this.router.navigate(['/auth/register']);
  }
}
