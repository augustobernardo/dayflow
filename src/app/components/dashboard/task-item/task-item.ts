import { Component, ChangeDetectionStrategy, input, output, booleanAttribute, computed } from '@angular/core';
import { LucideCheck, LucideCircle, LucidePencil, LucideTrash2 } from '@lucide/angular';
import { PriorityBadgeComponent, type Priority } from '../priority-badge/priority-badge';

@Component({
  selector: 'app-task-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideCheck, LucideCircle, LucidePencil, LucideTrash2, PriorityBadgeComponent],
  host: {
    'role': 'group',
    '[class.completed]': 'isCompleted()',
  },
  templateUrl: './task-item.html',
  styleUrl: './task-item.scss',
})
export class TaskItemComponent {
  title = input.required<string>();
  dueDate = input.required<string>();
  dueTime = input.required<string>();
  priority = input.required<Priority>();
  completed = input(false, { transform: booleanAttribute });

  toggleTask = output<void>();
  editTask = output<void>();
  deleteTask = output<void>();

  protected isCompleted = computed(() => this.completed());

  protected toggle(): void {
    this.toggleTask.emit();
  }

  protected onSpace(event: Event): void {
    event.preventDefault();
    this.toggle();
  }
}
