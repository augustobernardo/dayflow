import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  HostListener,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { LanguageSwitcherComponent } from '../../../shared/components/language-switcher/language-switcher';

@Component({
  selector: 'landing-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LanguageSwitcherComponent],
  host: {
    'class': 'navbar-host',
  },
  template: `
    <nav
      class="navbar"
      [class.scrolled]="scrolled()"
      role="navigation"
      aria-label="Main navigation"
    >
      <div class="navbar-inner">
        <a class="navbar-brand" routerLink="/" aria-label="DayFlow Home">
          <span class="brand-icon">&#9670;</span>
          <span class="brand-text">DayFlow</span>
        </a>

        <div class="navbar-links" [class.open]="mobileMenuOpen()">
          <a
            class="nav-link"
            [class.active]="activeSection() === 'features'"
            (click)="scrollTo('features'); closeMobileMenu()"
            i18n="@@nav.features"
          >Features</a>
          <a
            class="nav-link"
            [class.active]="activeSection() === 'benefits'"
            (click)="scrollTo('benefits'); closeMobileMenu()"
            i18n="@@nav.benefits"
          >Benefits</a>
          <a
            class="nav-link"
            [class.active]="activeSection() === 'cta'"
            (click)="scrollTo('cta'); closeMobileMenu()"
            i18n="@@nav.about"
          >About</a>

          <div class="mobile-auth">
            <a class="nav-link" (click)="navigate('/auth/login')" i18n="@@nav.login">Sign In</a>
            <button class="btn-primary-mobile" (click)="navigate('/auth/register')" i18n="@@nav.register">Get Started</button>
          </div>
        </div>

        <div class="navbar-actions">
          <app-language-switcher />
          <button
            class="theme-toggle"
            [attr.aria-label]="themeLabel"
            (click)="toggleTheme()"
          >
            <span class="material-symbols-outlined">
              {{ isDark() ? 'light_mode' : 'dark_mode' }}
            </span>
          </button>

          <a class="nav-login" (click)="navigate('/auth/login')" i18n="@@nav.login">Sign In</a>
          <button class="nav-cta" (click)="navigate('/auth/register')" i18n="@@nav.register">Get Started</button>

          <button
            class="mobile-menu-btn"
            [attr.aria-label]="mobileMenuOpen() ? closeMenuLabel : openMenuLabel"
            [attr.aria-expanded]="mobileMenuOpen()"
            (click)="toggleMobileMenu()"
          >
            <span class="material-symbols-outlined">
              {{ mobileMenuOpen() ? 'close' : 'menu' }}
            </span>
          </button>
        </div>
      </div>
    </nav>

    @if (mobileMenuOpen()) {
      <div class="mobile-overlay" (click)="closeMobileMenu()"></div>
    }
  `,
  styles: `
    :host { display: block; }

    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 50;
      transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }
    .navbar.scrolled {
      background: var(--glass-bg);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--glass-border);
      box-shadow: var(--shadow-sm);
    }

    .navbar-inner {
      max-width: 1280px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1.5rem;
      height: 4rem;
    }

    .navbar-brand {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      cursor: pointer;
    }
    .brand-icon { font-size: 1.25rem; color: var(--color-primary-500); line-height: 1; }
    .brand-text { font-size: 1.125rem; font-weight: 700; color: var(--color-text-primary); letter-spacing: -0.02em; }

    .navbar-links { display: none; align-items: center; gap: 0.25rem; }
    @media (min-width: 768px) { .navbar-links { display: flex; } }
    .navbar-links.open {
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 4rem;
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--color-bg-app);
      padding: 1.5rem;
      gap: 0.75rem;
      z-index: 49;
      overflow-y: auto;
    }
    @media (min-width: 768px) { .navbar-links.open { position: static; flex-direction: row; background: transparent; padding: 0; overflow: visible; } }

    .nav-link {
      padding: 0.5rem 0.75rem;
      font-size: 0.8125rem;
      font-weight: 500;
      color: var(--color-text-secondary);
      text-decoration: none;
      border-radius: var(--radius-md);
      transition: color 0.15s ease, background 0.15s ease;
      cursor: pointer;
    }
    .nav-link:hover { color: var(--color-text-primary); background: var(--color-surface-alt); }
    .nav-link.active { color: var(--color-primary-500); }

    .navbar-actions { display: flex; align-items: center; gap: 0.5rem; }

    .theme-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.25rem;
      height: 2.25rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      background: var(--color-surface);
      color: var(--color-text-secondary);
      cursor: pointer;
      transition: all 0.15s ease;
      padding: 0;
    }
    .theme-toggle:hover { border-color: var(--color-border-hover); background: var(--color-surface-alt); color: var(--color-text-primary); }
    .theme-toggle span { font-size: 1.125rem; }

    .nav-login {
      display: none;
      padding: 0.5rem 0.875rem;
      font-size: 0.8125rem;
      font-weight: 500;
      color: var(--color-text-secondary);
      text-decoration: none;
      border-radius: var(--radius-lg);
      transition: color 0.15s ease;
      cursor: pointer;
    }
    .nav-login:hover { color: var(--color-text-primary); }
    @media (min-width: 768px) { .nav-login { display: inline-flex; } }

    .nav-cta {
      display: none;
      padding: 0.5rem 0.875rem;
      font-size: 0.8125rem;
      font-weight: 600;
      color: #fff;
      background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
      border: none;
      border-radius: var(--radius-lg);
      cursor: pointer;
      transition: all 0.15s ease;
      box-shadow: 0 1px 3px rgb(16 185 129 / 0.3);
      font-family: inherit;
    }
    .nav-cta:hover { box-shadow: 0 4px 12px rgb(16 185 129 / 0.35); transform: translateY(-1px); }
    @media (min-width: 768px) { .nav-cta { display: inline-flex; } }

    .mobile-menu-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.25rem;
      height: 2.25rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      background: var(--color-surface);
      color: var(--color-text-primary);
      cursor: pointer;
      padding: 0;
      transition: all 0.15s ease;
    }
    .mobile-menu-btn:hover { border-color: var(--color-border-hover); }
    .mobile-menu-btn span { font-size: 1.25rem; }
    @media (min-width: 768px) { .mobile-menu-btn { display: none; } }

    .mobile-auth {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding-top: 0.75rem;
      border-top: 1px solid var(--color-border);
      margin-top: 0.5rem;
    }
    @media (min-width: 768px) { .mobile-auth { display: none; } }

    .btn-primary-mobile {
      width: 100%;
      padding: 0.625rem 1rem;
      font-size: 0.875rem;
      font-weight: 600;
      color: #fff;
      background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
      border: none;
      border-radius: var(--radius-lg);
      cursor: pointer;
      transition: all 0.15s ease;
      font-family: inherit;
    }

    .mobile-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgb(0 0 0 / 0.3);
      z-index: 48;
    }
    @media (max-width: 767px) { .mobile-overlay { display: block; } }
  `,
})
export class NavbarLandingComponent implements AfterViewInit, OnDestroy {
  private router = inject(Router);

  protected scrolled = signal(false);
  protected mobileMenuOpen = signal(false);
  protected activeSection = signal<string | null>(null);
  protected isDark = signal(false);

  protected readonly themeLabel = $localize`:@@common.themeToggle:Toggle theme`;
  protected readonly openMenuLabel = $localize`:@@common.openMenu:Open menu`;
  protected readonly closeMenuLabel = $localize`:@@common.closeMenu:Close menu`;

  private observer?: IntersectionObserver;
  private readonly sectionIds = ['hero', 'features', 'benefits', 'cta'];

  constructor() {
    const stored = localStorage.getItem('dayflow-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      this.isDark.set(true);
      document.documentElement.classList.add('dark');
    }
  }

  ngAfterViewInit(): void {
    this.setupSectionObserver();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private setupSectionObserver(): void {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) this.activeSection.set(visible.target.id);
      },
      { rootMargin: '-10% 0px -75% 0px', threshold: 0 },
    );
    this.sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });
  }

  toggleTheme(): void {
    this.isDark.update((v) => !v);
    const html = document.documentElement;
    if (this.isDark()) {
      html.classList.add('dark');
      localStorage.setItem('dayflow-theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('dayflow-theme', 'light');
    }
  }

  scrollTo(id: string): void {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  navigate(path: string): void {
    this.router.navigate([path]);
    this.closeMobileMenu();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.scrolled.set(window.scrollY > 10);
  }
}
