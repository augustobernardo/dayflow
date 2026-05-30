import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'stats-card',
    '[style.--card-accent]': 'accentColor()',
  },
  templateUrl: './stats-card.html',
  styleUrl: './stats-card.scss',
})
export class StatsCardComponent {
  title = input.required<string>();
  value = input.required<number>();
  totalValue = input<number>();
  subtitle = input.required<string>();
  accentColor = input<string>('var(--color-primary-500)');
  showProgress = input(true);
  motivation = input<string>('');

  protected percentage = computed(() => {
    const total = this.totalValue();
    if (!total || total === 0) return 0;
    return Math.round((this.value() / total) * 100);
  });
}
