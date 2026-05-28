import { Component, ChangeDetectionStrategy, input } from '@angular/core';

export interface MomentumDay {
  day: string;
  dayShort: string;
  value: number;
  isToday: boolean;
}

@Component({
  selector: 'app-momentum-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'momentum-card',
  },
  templateUrl: './momentum-chart.html',
  styleUrl: './momentum-chart.scss',
})
export class MomentumChartComponent {
  title = input.required<string>();
  description = input.required<string>();
  data = input.required<MomentumDay[]>();
}
