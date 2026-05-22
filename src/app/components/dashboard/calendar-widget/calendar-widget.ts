import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { LucideCalendar } from '@lucide/angular';
import type { CalendarDay } from '../dashboard.mock';

@Component({
  selector: 'app-calendar-widget',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideCalendar],
  host: {
    'class': 'calendar-widget',
  },
  templateUrl: './calendar-widget.html',
  styleUrl: './calendar-widget.scss',
})
export class CalendarWidgetComponent {
  title = input.required<string>();
  days = input.required<CalendarDay[]>();
  monthLabel = input.required<string>();
}
