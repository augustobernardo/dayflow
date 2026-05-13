import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'landing-cta',
  imports: [NgOptimizedImage],
  templateUrl: './cta-landing.html',
})
export class CtaLandingComponent {
  protected readonly dashboardPreviewPath = 'assets/images/landing/dashboard_preview.png';
}
