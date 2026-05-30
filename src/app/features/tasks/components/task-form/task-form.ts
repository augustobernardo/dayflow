import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import type { TaskPriority, TaskStatus } from '../../../../core/models/task.model';

@Component({
  selector: 'app-task-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'task-form',
  },
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskFormComponent {
  title = input<string>('');
  description = input<string>('');
  priority = input<TaskPriority>('medium');
  status = input<TaskStatus>('pending');
  dueDate = input<string>('');
  saveLabel = input<string>('Save');
  saving = input(false);

  titleChange = output<string>();
  descriptionChange = output<string>();
  priorityChange = output<TaskPriority>();
  statusChange = output<TaskStatus>();
  dueDateChange = output<string>();
  save = output<void>();
  cancel = output<void>();
}
