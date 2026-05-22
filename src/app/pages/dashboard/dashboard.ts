import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { StatsCardComponent } from '../../components/dashboard/stats-card/stats-card';
import { PendingTasksCardComponent } from '../../components/dashboard/pending-tasks-card/pending-tasks-card';
import { CalendarWidgetComponent } from '../../components/dashboard/calendar-widget/calendar-widget';
import { StreakCardComponent } from '../../components/dashboard/streak-card/streak-card';
import { MomentumChartComponent } from '../../components/dashboard/momentum-chart/momentum-chart';
import { TaskDialogComponent } from '../../features/tasks/components/task-dialog/task-dialog';
import { TaskStore } from '../../core/stores/task.store';
import {
  MOCK_CALENDAR_DAYS,
  MOCK_MOMENTUM,
  MOCK_STREAK,
  MOCK_CALENDAR_MONTH,
} from '../../components/dashboard/dashboard.mock';

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

  protected readonly calendarDays = MOCK_CALENDAR_DAYS;
  protected readonly momentum = MOCK_MOMENTUM;
  protected readonly streak = MOCK_STREAK;
  protected readonly calendarMonth = MOCK_CALENDAR_MONTH;

  protected tasksCompleted = this.taskStore.completedCount;
  protected totalTasks = this.taskStore.totalTasks;
  protected completionPct = this.taskStore.completionPercentage;

  protected dialogOpen = this.taskStore.dialogOpen;

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
