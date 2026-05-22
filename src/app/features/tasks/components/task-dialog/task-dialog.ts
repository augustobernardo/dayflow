import { Component, ChangeDetectionStrategy, inject, signal, afterNextRender, effect } from '@angular/core';
import { LucideX } from '@lucide/angular';
import { TaskFormComponent } from '../task-form/task-form';
import { TaskStore } from '../../../../core/stores/task.store';
import type { TaskPriority, TaskStatus, CreateTaskDto, UpdateTaskDto } from '../../../../core/models/task.model';

@Component({
  selector: 'app-task-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideX, TaskFormComponent],
  host: {
    'class': 'task-dialog-overlay',
    'role': 'dialog',
    '[attr.aria-modal]': 'true',
    '[attr.aria-label]': 'dialogTitle()',
    '(click)': 'onOverlayClick($event)',
  },
  templateUrl: './task-dialog.html',
  styleUrl: './task-dialog.scss',
})
export class TaskDialogComponent {
  private taskStore = inject(TaskStore);

  protected title = signal('');
  protected description = signal('');
  protected priority = signal<TaskPriority>('medium');
  protected status = signal<TaskStatus>('pending');
  protected dueDate = signal('');

  protected dialogTitle = signal('');

  constructor() {
    const mode = this.taskStore.dialogMode();
    const existing = this.taskStore.dialogTask();

    if (mode === 'edit' && existing) {
      this.dialogTitle.set($localize`:@@task.dialog.editTitle:Edit Task`);
      this.title.set(existing.title);
      this.description.set(existing.description);
      this.priority.set(existing.priority);
      this.status.set(existing.status);
      if (existing.dueDate) {
        this.dueDate.set(this.toDatetimeLocal(existing.dueDate));
      }
    } else {
      this.dialogTitle.set($localize`:@@task.dialog.createTitle:Create Task`);
    }

    // Trap focus inside dialog on open
    afterNextRender(() => {
      const firstInput = document.querySelector('#task-title') as HTMLElement;
      firstInput?.focus();
    });
  }

  protected onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('task-dialog-overlay')) {
      this.close();
    }
  }

  protected close(): void {
    this.taskStore.closeDialog();
  }

  protected onSave(): void {
    const mode = this.taskStore.dialogMode();
    const existing = this.taskStore.dialogTask();

    if (mode === 'create') {
      const dto: CreateTaskDto = {
        title: this.title().trim(),
        description: this.description().trim(),
        priority: this.priority(),
        status: this.status(),
        dueDate: this.dueDate() ? new Date(this.dueDate()) : null,
      };
      if (!dto.title) return;
      this.taskStore.createTask(dto);
    } else if (mode === 'edit' && existing) {
      const dto: UpdateTaskDto = {
        title: this.title().trim(),
        description: this.description().trim(),
        priority: this.priority(),
        status: this.status(),
        dueDate: this.dueDate() ? new Date(this.dueDate()) : null,
      };
      if (!dto.title) return;
      this.taskStore.updateTask(existing.id, dto);
    }

    this.close();
  }

  protected get saveLabel(): string {
    return this.taskStore.dialogMode() === 'edit'
      ? $localize`:@@task.dialog.saveEdit:Save Changes`
      : $localize`:@@task.dialog.saveCreate:Create Task`;
  }

  private toDatetimeLocal(date: Date): string {
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }
}
