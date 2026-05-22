import { Component, ChangeDetectionStrategy, input, inject } from '@angular/core';
import { TaskItemComponent } from '../task-item/task-item';
import { TaskStore } from '../../../core/stores/task.store';

@Component({
  selector: 'app-pending-tasks-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TaskItemComponent],
  host: {
    'class': 'pending-tasks-card',
  },
  templateUrl: './pending-tasks-card.html',
  styleUrl: './pending-tasks-card.scss',
})
export class PendingTasksCardComponent {
  private taskStore = inject(TaskStore);

  title = input.required<string>();
  viewAllLabel = input<string>('View All');

  protected tasks = this.taskStore.pendingTasks;

  protected onToggle(id: string): void {
    this.taskStore.toggleTask(id);
  }

  protected onEdit(id: string): void {
    const task = this.taskStore.tasks().find((t) => t.id === id);
    if (task) {
      this.taskStore.openEditDialog(task);
    }
  }

  protected onDelete(id: string): void {
    this.taskStore.deleteTask(id);
  }

  protected formatDueDate(date: Date | null): string {
    if (!date) return $localize`:@@dashboard.noDueDate:No due date`;
    const now = new Date();
    const due = date;
    const diffDays = Math.ceil(
      (due.getTime() - now.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24),
    );
    if (diffDays === 0) return $localize`:@@dashboard.today:Today`;
    if (diffDays === 1) return $localize`:@@dashboard.tomorrow:Tomorrow`;
    if (diffDays < 0) return $localize`:@@dashboard.overdue:Overdue`;
    return due.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }

  protected formatDueTime(date: Date | null): string {
    if (!date) return '';
    return date.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
    });
  }
}
