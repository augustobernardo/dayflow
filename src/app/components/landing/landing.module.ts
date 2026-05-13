import { NgModule } from '@angular/core';
import { NavbarLandingComponent } from './navbar/navbar-landing';
import { HeroLandingComponent } from './hero/hero-landing';
import { CtaLandingComponent } from './cta/cta-landing';
import { BenefitsLandingComponent } from './benefits/benefits-landing';

@NgModule({
  imports: [
    NavbarLandingComponent,
    HeroLandingComponent,
    CtaLandingComponent,
    BenefitsLandingComponent
  ],
  exports: [
    NavbarLandingComponent,
    HeroLandingComponent,
    CtaLandingComponent,
    BenefitsLandingComponent
  ],
})
export class LandingModule {}
