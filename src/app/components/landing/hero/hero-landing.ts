import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button';

@Component({
  selector: 'landing-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent],
  template: `
    <section id="hero" class="hero-section">
      <!-- Separate glow layer — wider than content, independently centered -->
      <div class="hero-bg" aria-hidden="true">
        <div class="ambient-blob ambient-1"></div>
        <div class="ambient-blob ambient-2"></div>
      </div>

      <div class="hero-inner">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          <span i18n="@@landing.hero.badge">Now in Public Beta</span>
        </div>

        <h1 class="hero-title">
          <span i18n="@@landing.hero.title">Focus through depth.</span>
          <span class="hero-highlight" i18n="@@landing.hero.titleHighlight">Organize your day</span>
          <span i18n="@@landing.hero.subtitle">with surgical precision.</span>
        </h1>

        <p class="hero-description" i18n="@@landing.hero.description">
          A minimalist productivity system designed for high-performance individuals who demand speed, clarity, and zero noise.
        </p>

        <div class="hero-actions">
          <app-button size="lg" (clicked)="navigate('/auth/register')">
            <span i18n="@@landing.hero.ctaPrimary">Start for free</span>
            <!-- <span class="material-symbols-outlined cta-arrow">arrow_forward</span> -->
          </app-button>
          <app-button variant="secondary" size="lg" (clicked)="scrollToFeatures()">
            <span i18n="@@landing.hero.ctaSecondary">See how it works</span>
          </app-button>
        </div>
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }

    /* --- Section container --- */
    .hero-section {
      position: relative;
      padding: 8rem 0 10rem;
      overflow: hidden;
      isolation: isolate;
      background: var(--color-bg-app);
    }

    /* z-index 2 — bottom fade: blends green glow into next section */
    .hero-section::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 320px;
      z-index: 2;
      pointer-events: none;
      background: linear-gradient(
        to bottom,
        transparent 0%,
        var(--color-bg-app) 80%
      );
    }

    /* =============================================
       GLOW LAYER — wider than content, independently centered
       z-index 0
       ============================================= */
    .hero-bg {
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      overflow: visible;
    }

    /* Wide centered radial glow */
    .hero-bg::before {
      content: '';
      position: absolute;
      top: -10%;
      bottom: 0;
      width: 100%;
      max-width: 1800px;
      left: 50%;
      transform: translateX(-50%);
      background:
        radial-gradient(
          ellipse 70% 55% at 50% 45%,
          rgb(16 185 129 / 0.24) 0%,
          rgb(16 185 129 / 0.12) 30%,
          rgb(16 185 129 / 0.04) 55%,
          transparent 72%
        );
      filter: blur(70px);
    }

    /* Floating corner blobs — organic cinematic movement */
    .ambient-blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(90px);
      opacity: 0.12;
    }
    .ambient-1 {
      width: 550px;
      height: 550px;
      background: var(--color-primary-400);
      top: -130px;
      right: -100px;
      animation: float-1 24s ease-in-out infinite;
    }
    .ambient-2 {
      width: 420px;
      height: 420px;
      background: var(--color-primary-600);
      bottom: -120px;
      left: -110px;
      animation: float-2 30s ease-in-out infinite;
      animation-delay: -8s;
    }

    @keyframes float-1 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(45px, -40px) scale(1.06); }
      66% { transform: translate(-30px, 30px) scale(0.93); }
    }
    @keyframes float-2 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(-35px, 35px) scale(1.09); }
      66% { transform: translate(25px, -25px) scale(0.91); }
    }

    /* =============================================
       CONTENT LAYER — centered, constrained width
       z-index 3
       ============================================= */
    .hero-inner {
      position: relative;
      z-index: 3;
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
      padding: 0 1.5rem;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.25rem 0.75rem;
      margin-bottom: 1.5rem;
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--color-primary-600);
      background: rgb(16 185 129 / 0.08);
      border: 1px solid rgb(16 185 129 / 0.15);
      border-radius: var(--radius-full);
    }
    .dark .hero-badge { color: var(--color-primary-400); }
    .badge-dot {
      width: 0.375rem;
      height: 0.375rem;
      background: var(--color-primary-500);
      border-radius: 50%;
      animation: pulse-dot 2s ease-in-out infinite;
    }
    @keyframes pulse-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 700;
      line-height: 1.08;
      letter-spacing: -0.03em;
      color: var(--color-text-primary);
      margin: 0 0 1.5rem;
    }

    .hero-highlight {
      background: linear-gradient(135deg, var(--color-primary-400), var(--color-primary-600));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-description {
      font-size: 1.125rem;
      line-height: 1.65;
      color: var(--color-text-secondary);
      max-width: 560px;
      margin: 0 auto 2.5rem;
    }
    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
    }
    .cta-arrow { font-size: 1.125rem; }

    /* --- Responsive --- */
    @media (max-width: 768px) {
      .hero-section {
        padding: 6rem 0 6rem;
      }
      .hero-section::after {
        height: 180px;
      }
      .hero-bg::before {
        filter: blur(45px);
        background:
          radial-gradient(
            ellipse 90% 45% at 50% 40%,
            rgb(16 185 129 / 0.30) 0%,
            rgb(16 185 129 / 0.14) 30%,
            rgb(16 185 129 / 0.05) 55%,
            transparent 70%
          );
      }
      .ambient-blob { filter: blur(55px); }
      .ambient-1 { width: 320px; height: 320px; top: -90px; right: -60px; }
      .ambient-2 { width: 260px; height: 260px; bottom: -70px; left: -70px; }
    }
    @media (max-width: 640px) {
      .hero-title { font-size: 2.25rem; }
    }
  `,
})
export class HeroLandingComponent {
  private router = inject(Router);

  navigate(path: string): void {
    this.router.navigate([path]);
  }

  scrollToFeatures(): void {
    const el = document.getElementById('features');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
