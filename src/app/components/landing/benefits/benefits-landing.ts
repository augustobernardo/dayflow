import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { TranslationService } from '../../../core/i18n';

interface Stat {
  value: string;
  id: string;
}

@Component({
  selector: 'landing-benefits',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="benefits" class="benefits-section">
      <div class="benefits-inner">
        <div class="benefits-card">
          @for (stat of stats; track stat.id) {
            <div class="stat-item">
              <span class="stat-value">{{ stat.value }}</span>
              <span class="stat-label">{{ translateLabel(stat.id) }}</span>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }
    .benefits-section { padding: 3rem 1.5rem; }
    .benefits-inner { max-width: 1280px; margin: 0 auto; }

    .benefits-card {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      background: var(--color-surface);
      overflow: hidden;
    }
    @media (max-width: 640px) { .benefits-card { grid-template-columns: 1fr; } }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2.5rem 1.5rem;
      text-align: center;
      position: relative;
    }
    .stat-item:not(:last-child)::after {
      content: '';
      position: absolute;
      right: 0;
      top: 20%;
      bottom: 20%;
      width: 1px;
      background: var(--color-border);
    }
    @media (max-width: 640px) { .stat-item:not(:last-child)::after { right: 10%; left: 10%; top: auto; bottom: 0; width: auto; height: 1px; } }

    .stat-value { font-size: 2.5rem; font-weight: 800; letter-spacing: -0.03em; color: var(--color-text-primary); margin-bottom: 0.25rem; }
    @media (max-width: 640px) { .stat-value { font-size: 2rem; } }
    .stat-label { font-size: 0.75rem; font-weight: 500; color: var(--color-text-tertiary); text-transform: uppercase; letter-spacing: 0.08em; }
  `,
})
export class BenefitsLandingComponent {
  private translationService = inject(TranslationService);

  protected stats: Stat[] = [
    { value: '40%', id: 'landing.benefits.efficiency' },
    { value: '0.2s', id: 'landing.benefits.latency' },
    { value: '100k+', id: 'landing.benefits.tasks' },
  ];

  translateLabel(id: string): string {
    return this.translationService.translate(id);
  }
}
