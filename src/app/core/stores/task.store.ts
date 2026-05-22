import { Injectable, signal, computed, inject } from '@angular/core';
import type { Task, CreateTaskDto, UpdateTaskDto, TaskPriority, TaskStatus, TaskDialogMode } from '../models/task.model';
import { TaskService } from '../../features/tasks/services/task.service';

function generateId(): string {
  return crypto.randomUUID();
}

const MOCK_INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Design system audit',
    description: 'Review typography, colors, and spacing across all components.',
    priority: 'high',
    status: 'pending',
    dueDate: new Date('2026-05-21T16:00:00'),
    createdAt: new Date('2026-05-20T09:00:00'),
    updatedAt: new Date('2026-05-20T09:00:00'),
  },
  {
    id: '2',
    title: 'Update team documentation',
    description: 'Refresh onboarding docs and API references.',
    priority: 'medium',
    status: 'pending',
    dueDate: new Date('2026-05-22T11:00:00'),
    createdAt: new Date('2026-05-19T14:00:00'),
    updatedAt: new Date('2026-05-19T14:00:00'),
  },
  {
    id: '3',
    title: 'Review pull requests',
    description: 'Audit open PRs for the dashboard feature branch.',
    priority: 'high',
    status: 'pending',
    dueDate: new Date('2026-05-21T18:30:00'),
    createdAt: new Date('2026-05-21T08:00:00'),
    updatedAt: new Date('2026-05-21T08:00:00'),
  },
  {
    id: '4',
    title: 'Prepare sprint retrospective',
    description: 'Gather metrics and feedback for the sprint review meeting.',
    priority: 'low',
    status: 'pending',
    dueDate: new Date('2026-05-23T14:00:00'),
    createdAt: new Date('2026-05-20T10:00:00'),
    updatedAt: new Date('2026-05-20T10:00:00'),
  },
  {
    id: '5',
    title: 'Optimize database queries',
    description: 'Profile slow queries and add missing indexes.',
    priority: 'medium',
    status: 'pending',
    dueDate: new Date('2026-05-23T17:00:00'),
    createdAt: new Date('2026-05-19T11:00:00'),
    updatedAt: new Date('2026-05-19T11:00:00'),
  },
];

@Injectable({ providedIn: 'root' })
export class TaskStore {
  private taskService = inject(TaskService);

  readonly tasks = signal<Task[]>(MOCK_INITIAL_TASKS);

  readonly pendingTasks = computed(() =>
    this.tasks().filter((t) => t.status !== 'completed'),
  );

  readonly completedTasks = computed(() =>
    this.tasks().filter((t) => t.status === 'completed'),
  );

  readonly totalTasks = computed(() => this.tasks().length);

  readonly completedCount = computed(() => this.completedTasks().length);

  readonly completionPercentage = computed(() => {
    const total = this.totalTasks();
    if (total === 0) return 0;
    return Math.round((this.completedCount() / total) * 100);
  });

  readonly dialogOpen = signal(false);
  readonly dialogMode = signal<TaskDialogMode>('create');
  readonly dialogTask = signal<Task | null>(null);

  openCreateDialog(): void {
    this.dialogMode.set('create');
    this.dialogTask.set(null);
    this.dialogOpen.set(true);
  }

  openEditDialog(task: Task): void {
    this.dialogMode.set('edit');
    this.dialogTask.set(task);
    this.dialogOpen.set(true);
  }

  closeDialog(): void {
    this.dialogOpen.set(false);
    this.dialogTask.set(null);
  }

  createTask(dto: CreateTaskDto): void {
    const now = new Date();
    const task: Task = {
      id: generateId(),
      title: dto.title,
      description: dto.description,
      priority: dto.priority,
      status: dto.status,
      dueDate: dto.dueDate,
      createdAt: now,
      updatedAt: now,
    };

    this.tasks.update((list) => [task, ...list]);

    // TODO: Replace local state with API state synchronization
    // this.taskService.createTask(dto).then(created => { ... })
  }

  updateTask(id: string, dto: UpdateTaskDto): void {
    this.tasks.update((list) =>
      list.map((t) =>
        t.id === id
          ? { ...t, ...dto, updatedAt: new Date() }
          : t,
      ),
    );

    // TODO: Replace local state with API state synchronization
    // this.taskService.updateTask(id, dto).then(updated => { ... })
  }

  deleteTask(id: string): void {
    this.tasks.update((list) => list.filter((t) => t.id !== id));

    // TODO: Replace local state with API state synchronization
    // this.taskService.deleteTask(id).then(() => { ... })
  }

  toggleTask(id: string): void {
    this.tasks.update((list) =>
      list.map((t) =>
        t.id === id
          ? {
              ...t,
              status: (t.status === 'completed' ? 'pending' : 'completed') as TaskStatus,
              updatedAt: new Date(),
            }
          : t,
      ),
    );

    // TODO: Replace local state with API state synchronization
    // const task = this.tasks().find(t => t.id === id);
    // if (task) this.taskService.toggleTask(id, task.status === 'completed').then(...)
  }
}
