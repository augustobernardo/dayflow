import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  NavbarLandingComponent,
  HeroLandingComponent,
  FeaturesLandingComponent,
  BenefitsLandingComponent,
  CtaLandingComponent,
  FooterLandingComponent,
} from '../../components/landing';

@Component({
  selector: 'page-landing',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavbarLandingComponent,
    HeroLandingComponent,
    FeaturesLandingComponent,
    BenefitsLandingComponent,
    CtaLandingComponent,
    FooterLandingComponent,
  ],
  template: `
    <landing-navbar />
    <main>
      <landing-hero />
      <landing-features />
      <landing-benefits />
      <landing-cta />
    </main>
    <landing-footer />
  `,
})
export class LandingPage {}
