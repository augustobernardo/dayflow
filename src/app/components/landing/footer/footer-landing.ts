import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { TranslationService } from '../../../core/i18n';

interface FooterLink {
  id: string;
  href: string;
}

interface FooterColumn {
  titleId: string;
  links: FooterLink[];
}

@Component({
  selector: 'landing-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer" role="contentinfo">
      <div class="footer-inner">
        <div class="footer-grid">
          <div class="footer-brand">
            <a class="footer-logo" routerLink="/">
              <span class="footer-brand-icon">&#9670;</span>
              <span class="footer-brand-text">DayFlow</span>
            </a>
            <p class="footer-brand-desc" i18n="@@footer.description">
              Built for the next generation of knowledge workers who value clarity and execution.
            </p>
          </div>

          @for (col of columns; track col.titleId) {
            <div class="footer-column">
              <h5 class="footer-column-title">{{ t(col.titleId) }}</h5>
              <ul class="footer-links">
                @for (link of col.links; track link.id) {
                  <li>
                    <a [href]="link.href" class="footer-link">{{ t(link.id) }}</a>
                  </li>
                }
              </ul>
            </div>
          }
        </div>

        <div class="footer-bottom">
          <p class="footer-copyright" i18n="@@footer.copyright">&copy; 2026 DayFlow. All rights reserved.</p>
          <div class="footer-bottom-links">
            <a href="#" class="footer-bottom-link" i18n="@@footer.privacy">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: `
    :host { display: block; }
    .footer { border-top: 1px solid var(--color-border); padding: 4rem 1.5rem 2rem; }
    .footer-inner { max-width: 1280px; margin: 0 auto; }

    .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 2rem; margin-bottom: 3rem; }
    @media (max-width: 1024px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
    @media (max-width: 640px) { .footer-grid { grid-template-columns: 1fr; } }

    .footer-brand { display: flex; flex-direction: column; gap: 0.75rem; }
    .footer-logo { display: flex; align-items: center; gap: 0.5rem; text-decoration: none; }
    .footer-brand-icon { font-size: 1.125rem; color: var(--color-primary-500); line-height: 1; }
    .footer-brand-text { font-size: 1.125rem; font-weight: 700; color: var(--color-text-primary); letter-spacing: -0.02em; }
    .footer-brand-desc { font-size: 0.8125rem; color: var(--color-text-tertiary); max-width: 280px; margin: 0; line-height: 1.6; }

    .footer-column { display: flex; flex-direction: column; gap: 0.75rem; }
    .footer-column-title { font-size: 0.75rem; font-weight: 600; color: var(--color-text-primary); text-transform: uppercase; letter-spacing: 0.05em; margin: 0; }
    .footer-links { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem; }
    .footer-link { font-size: 0.8125rem; color: var(--color-text-tertiary); text-decoration: none; transition: color 0.15s ease; }
    .footer-link:hover { color: var(--color-text-primary); }

    .footer-bottom { display: flex; align-items: center; justify-content: space-between; padding-top: 1.5rem; border-top: 1px solid var(--color-border); }
    @media (max-width: 640px) { .footer-bottom { flex-direction: column; gap: 0.5rem; } }
    .footer-copyright, .footer-bottom-link { font-size: 0.75rem; color: var(--color-text-tertiary); margin: 0; text-decoration: none; transition: color 0.15s ease; }
    .footer-bottom-link:hover { color: var(--color-text-primary); }
  `,
})
export class FooterLandingComponent {
  private translationService = inject(TranslationService);

  protected columns: FooterColumn[] = [
    {
      titleId: 'footer.product',
      links: [
        { id: 'footer.features', href: '#features' },
        { id: 'footer.api', href: '#' },
        { id: 'footer.integrations', href: '#' },
      ],
    },
    {
      titleId: 'footer.company',
      links: [
        { id: 'footer.about', href: '#' },
        { id: 'footer.changelog', href: '#' },
        { id: 'footer.careers', href: '#' },
      ],
    },
    {
      titleId: 'footer.support',
      links: [
        { id: 'footer.docs', href: '#' },
        { id: 'footer.status', href: '#' },
        { id: 'footer.privacy', href: '#' },
      ],
    },
    {
      titleId: 'footer.social',
      links: [
        { id: 'footer.twitter', href: '#' },
        { id: 'footer.github', href: '#' },
        { id: 'footer.discord', href: '#' },
      ],
    },
  ];

  t(id: string): string {
    return this.translationService.translate(id);
  }
}
