import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { LucideCalendar } from '@lucide/angular';

export interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
}

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
