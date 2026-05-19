import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'landing-features',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="features" class="features-section">
      <div class="features-inner">
        <div class="features-header">
          <h2 class="features-title" i18n="@@landing.features.sectionTitle">Engineered for flow state</h2>
          <p class="features-subtitle" i18n="@@landing.features.sectionDescription">Every detail optimized to keep you in the zone.</p>
        </div>

        <div class="features-grid">
          <div class="feature-card card-main">
            <div class="card-icon-wrapper">
              <span class="material-symbols-outlined card-icon">category</span>
            </div>
            <h3 class="card-title" i18n="@@landing.features.categorization.title">Smart Categorization</h3>
            <p class="card-description" i18n="@@landing.features.categorization.description">
              Hierarchical organization that moves at the speed of thought. Dynamic tags and nested workspaces for complex project architectures.
            </p>
            <div class="card-shimmer"></div>
          </div>

          <div class="feature-card card-side">
            <div class="card-icon-wrapper">
              <span class="material-symbols-outlined card-icon">insights</span>
            </div>
            <h3 class="card-title" i18n="@@landing.features.analytics.title">Deep Analytics</h3>
            <p class="card-description" i18n="@@landing.features.analytics.description">
              Quantify your output. Deep-dive into velocity metrics and focus blocks without the fluff.
            </p>
          </div>

          <div class="feature-card card-wide">
            <div class="card-wide-content">
              <div>
                <div class="card-icon-wrapper">
                  <span class="material-symbols-outlined card-icon">shield_lock</span>
                </div>
                <h3 class="card-title" i18n="@@landing.features.privacy.title">Privacy First</h3>
                <p class="card-description" i18n="@@landing.features.privacy.description">
                  End-to-end encryption for your data. Your workflows are your business. We just provide the engine.
                </p>
              </div>
              <div class="privacy-pill">
                <span class="material-symbols-outlined pill-icon">lock</span>
                <span class="pill-text" i18n="@@landing.features.privacy.pill">E2E Encrypted</span>
              </div>
            </div>
            <div class="card-shimmer"></div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }
    .features-section { padding: 5rem 1.5rem; }
    @media (max-width: 640px) { .features-section { padding: 3rem 1.5rem; } }
    .features-inner { max-width: 1280px; margin: 0 auto; }
    .features-header { text-align: center; margin-bottom: 3rem; }
    .features-title { font-size: 2rem; font-weight: 700; letter-spacing: -0.02em; color: var(--color-text-primary); margin: 0 0 0.75rem; }
    @media (max-width: 640px) { .features-title { font-size: 1.5rem; } }
    .features-subtitle { font-size: 1rem; color: var(--color-text-secondary); margin: 0; max-width: 480px; margin-left: auto; margin-right: auto; }

    .features-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
    @media (min-width: 768px) { .features-grid { grid-template-columns: 1.5fr 1fr; grid-template-rows: auto auto; } .card-main { grid-row: 1 / 3; } .card-wide { grid-column: 1 / -1; } }

    .feature-card {
      position: relative;
      padding: 1.75rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      background: var(--color-surface);
      overflow: hidden;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }
    .feature-card:hover { border-color: var(--color-border-hover); box-shadow: var(--shadow-md); }
    .card-shimmer { position: absolute; inset: 0; background: linear-gradient(135deg, transparent 30%, rgb(255 255 255 / 0.02) 50%, transparent 70%); pointer-events: none; }

    .card-icon-wrapper { display: flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; border-radius: var(--radius-lg); background: rgb(16 185 129 / 0.08); margin-bottom: 1rem; }
    .card-icon { font-size: 1.375rem; color: var(--color-primary-500); }
    .card-title { font-size: 1.125rem; font-weight: 600; color: var(--color-text-primary); margin: 0 0 0.5rem; letter-spacing: -0.01em; }
    .card-description { font-size: 0.875rem; line-height: 1.6; color: var(--color-text-secondary); margin: 0; }
    .card-main { min-height: 300px; display: flex; flex-direction: column; }
    .card-main .card-description { max-width: 360px; }
    .card-side { display: flex; flex-direction: column; }
    .card-wide-content { display: flex; align-items: flex-start; justify-content: space-between; gap: 2rem; }
    @media (max-width: 640px) { .card-wide-content { flex-direction: column; gap: 1.5rem; } }

    .privacy-pill { display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.25rem; border: 1px solid rgb(16 185 129 / 0.2); border-radius: var(--radius-full); background: rgb(16 185 129 / 0.04); flex-shrink: 0; }
    .pill-icon { font-size: 1.125rem; color: var(--color-primary-500); }
    .pill-text { font-size: 0.8125rem; font-weight: 500; color: var(--color-primary-600); }
    .dark .pill-text { color: var(--color-primary-400); }
  `,
})
export class FeaturesLandingComponent {}
