import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { StatsCardComponent } from '../../components/dashboard/stats-card/stats-card';
import { PendingTasksCardComponent } from '../../components/dashboard/pending-tasks-card/pending-tasks-card';
import { CalendarWidgetComponent } from '../../components/dashboard/calendar-widget/calendar-widget';
import { StreakCardComponent } from '../../components/dashboard/streak-card/streak-card';
import { MomentumChartComponent } from '../../components/dashboard/momentum-chart/momentum-chart';
import { TaskDialogComponent } from '../../features/tasks/components/task-dialog/task-dialog';
import { TaskStore } from '../../core/stores/task.store';

export interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
}

export interface MomentumDay {
  day: string;
  dayShort: string;
  value: number;
  isToday: boolean;
}

@Component({
  selector: 'page-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    StatsCardComponent,
    PendingTasksCardComponent,
    CalendarWidgetComponent,
    StreakCardComponent,
    MomentumChartComponent,
    TaskDialogComponent,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardPage {
  private taskStore = inject(TaskStore);

  protected tasksCompleted = this.taskStore.completedCount;
  protected totalTasks = this.taskStore.totalTasks;
  protected completionPct = this.taskStore.completionPercentage;
  protected dialogOpen = this.taskStore.dialogOpen;
  protected loading = this.taskStore.loading;

  protected readonly calendarDays = computed<CalendarDay[]>(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const today = now.getDate();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startPad = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    const totalCells = Math.ceil((startPad + daysInMonth) / 7) * 7;

    const tasks = this.taskStore.tasks();
    const dueDates = new Set<number>();
    for (const t of tasks) {
      if (t.dueDate) {
        const d = new Date(t.dueDate);
        if (d.getFullYear() === year && d.getMonth() === month) {
          dueDates.add(d.getDate());
        }
      }
    }

    const days: CalendarDay[] = [];
    for (let i = 0; i < totalCells; i++) {
      const dayNum = i - startPad + 1;
      const isCurrentMonth = dayNum >= 1 && dayNum <= daysInMonth;
      days.push({
        date: isCurrentMonth ? dayNum : (dayNum < 1 ? new Date(year, month, 0).getDate() + dayNum : dayNum - daysInMonth),
        isCurrentMonth,
        isToday: isCurrentMonth && dayNum === today,
      });
    }
    return days;
  });

  protected readonly calendarMonth = computed(() => {
    const now = new Date();
    return now.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  });

  protected readonly momentum = computed<MomentumDay[]>(() => {
    const now = new Date();
    const days: MomentumDay[] = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const tasks = this.taskStore.completedTasks();
    const completedByDay = new Map<string, number>();

    for (const t of tasks) {
      if (!t.completedAt) continue;
      const d = new Date(t.completedAt);
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      completedByDay.set(key, (completedByDay.get(key) ?? 0) + 1);
    }

    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      const maxTasks = Math.max(...Array.from(completedByDay.values()), 1);
      const value = Math.round(((completedByDay.get(key) ?? 0) / maxTasks) * 100);

      days.push({
        day: dayNames[d.getDay()],
        dayShort: dayNames[d.getDay()][0],
        value,
        isToday: i === 0,
      });
    }
    return days;
  });

  protected readonly streak = computed<number>(() => {
    const tasks = this.taskStore.completedTasks();
    const completionDates = new Set<string>();

    for (const t of tasks) {
      if (!t.completedAt) continue;
      const d = new Date(t.completedAt);
      completionDates.add(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`);
    }

    let count = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      if (completionDates.has(key)) {
        count++;
      } else if (i > 0) {
        break;
      }
    }
    return count;
  });

  protected readonly motivation = computed(() => {
    const pct = this.completionPct();
    if (pct >= 100) return $localize`:@@dashboard.motivation.great:Great work! Keep the momentum going.`;
    if (pct >= 75) return $localize`:@@dashboard.motivation.good:You're on track. Stay focused!`;
    if (pct >= 25) return $localize`:@@dashboard.motivation.ok:A few more tasks to reach your goal.`;
    return $localize`:@@dashboard.motivation.start:Let's get started on today's tasks.`;
  });

  protected readonly statsTitle = $localize`:@@dashboard.tasksCompleted:Tasks Completed`;
  protected readonly pendingTitle = $localize`:@@dashboard.pendingTasks:Pending Tasks`;
  protected readonly calendarTitle = $localize`:@@dashboard.calendar:Calendar`;
  protected readonly streakTitle = $localize`:@@dashboard.streak.title:Focus Streak`;
  protected readonly momentumTitle = $localize`:@@dashboard.momentum.title:Weekly Momentum`;
  protected readonly momentumDescription = $localize`:@@dashboard.momentum.description:Your productivity pattern over the last 7 days. Keep the rhythm going.`;
  protected readonly dailyGoal = $localize`:@@dashboard.dailyGoal:Daily Goal`;
  protected readonly daysLabel = $localize`:@@dashboard.streak.days:Days`;
  protected readonly viewAllLabel = $localize`:@@dashboard.viewAll:View All`;
}
