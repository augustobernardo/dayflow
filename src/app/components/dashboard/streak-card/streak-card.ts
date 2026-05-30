import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { LucideFlame } from '@lucide/angular';

@Component({
  selector: 'app-streak-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideFlame],
  host: {
    'class': 'streak-card',
  },
  templateUrl: './streak-card.html',
  styleUrl: './streak-card.scss',
})
export class StreakCardComponent {
  title = input.required<string>();
  streak = input.required<number>();
  daysLabel = input.required<string>();
}
