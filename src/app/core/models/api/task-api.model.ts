import type { TaskPriority, TaskStatus } from '../task.model';

export const PRIORITY_MAP: Record<TaskPriority, number> = {
  low: 1,
  medium: 2,
  high: 3,
};

export const PRIORITY_REVERSE: Record<number, TaskPriority> = {
  1: 'low',
  2: 'medium',
  3: 'high',
};

export const STATUS_MAP: Record<TaskStatus, number> = {
  pending: 1,
  'in-progress': 2,
  completed: 3,
};

export const STATUS_REVERSE: Record<number, TaskStatus> = {
  1: 'pending',
  2: 'in-progress',
  3: 'completed',
};

export interface TaskApiDto {
  id: string;
  userId: string;
  title: string;
  description: string;
  priority: number;
  status: number;
  isCompleted: boolean;
  dueDate: string | null;
  completedAt: string | null;
  updatedAt: string | null;
  createdAt: string;
}

export interface CreateTaskApiDto {
  title: string;
  description: string;
  priority: number;
  status: number;
  isCompleted: boolean;
  dueDate: string | null;
}

export interface UpdateTaskApiDto {
  id: string;
  title: string;
  description: string;
  priority: number;
  status: number;
  isCompleted: boolean;
  dueDate: string | null;
}
