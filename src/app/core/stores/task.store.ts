import { Injectable, signal, computed, inject } from '@angular/core';
import type { Task, CreateTaskDto, UpdateTaskDto, TaskStatus } from '../models/task.model';
import { TaskService } from '../../features/tasks/services/task.service';
import { taskApiToFrontend, createTaskFrontendToApi, updateTaskFrontendToApi } from '../mappers/task.mapper';

@Injectable({ providedIn: 'root' })
export class TaskStore {
  private taskService = inject(TaskService);

  readonly tasks = signal<Task[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  private initialized = false;

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
  readonly dialogMode = signal<'create' | 'edit'>('create');
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

  async loadTasks(): Promise<void> {
    if (this.initialized) return;
    this.initialized = true;
    this.loading.set(true);
    this.error.set(null);
    try {
      const dtos = await this.taskService.getTasks();
      this.tasks.set(dtos.map(taskApiToFrontend));
    } catch (err) {
      this.error.set('Failed to load tasks.');
      console.error('[TaskStore] loadTasks error:', err);
    } finally {
      this.loading.set(false);
    }
  }

  async createTask(dto: CreateTaskDto): Promise<void> {
    this.error.set(null);
    try {
      const apiDto = createTaskFrontendToApi(dto);
      const created = await this.taskService.createTask(apiDto);
      this.tasks.update((list) => [taskApiToFrontend(created), ...list]);
    } catch (err) {
      this.error.set('Failed to create task.');
      console.error('[TaskStore] createTask error:', err);
    }
  }

  async updateTask(id: string, dto: UpdateTaskDto): Promise<void> {
    this.error.set(null);
    try {
      const apiDto = updateTaskFrontendToApi(id, dto);
      await this.taskService.updateTask(id, apiDto);
      this.tasks.update((list) =>
        list.map((t) =>
          t.id === id
            ? { ...t, ...dto, updatedAt: new Date() }
            : t,
        ),
      );
    } catch (err) {
      this.error.set('Failed to update task.');
      console.error('[TaskStore] updateTask error:', err);
    }
  }

  async deleteTask(id: string): Promise<void> {
    this.error.set(null);
    try {
      await this.taskService.deleteTask(id);
      this.tasks.update((list) => list.filter((t) => t.id !== id));
    } catch (err) {
      this.error.set('Failed to delete task.');
      console.error('[TaskStore] deleteTask error:', err);
    }
  }

  async toggleTask(id: string): Promise<void> {
    const task = this.tasks().find((t) => t.id === id);
    if (!task) return;

    const newStatus: TaskStatus = task.status === 'completed' ? 'pending' : 'completed';
    await this.updateTask(id, { status: newStatus });
  }
}
