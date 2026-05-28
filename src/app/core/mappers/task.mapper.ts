import type { Task, CreateTaskDto, UpdateTaskDto } from '../models/task.model';
import type { TaskApiDto, CreateTaskApiDto, UpdateTaskApiDto } from '../models/api/task-api.model';
import { PRIORITY_REVERSE, PRIORITY_MAP, STATUS_REVERSE, STATUS_MAP } from '../models/api/task-api.model';

export function taskApiToFrontend(dto: TaskApiDto): Task {
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    priority: PRIORITY_REVERSE[dto.priority] ?? 'medium',
    status: STATUS_REVERSE[dto.status] ?? 'pending',
    dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
    completedAt: dto.completedAt ? new Date(dto.completedAt) : null,
    createdAt: new Date(dto.createdAt),
    updatedAt: dto.updatedAt ? new Date(dto.updatedAt) : new Date(dto.createdAt),
  };
}

export function createTaskFrontendToApi(dto: CreateTaskDto): CreateTaskApiDto {
  return {
    title: dto.title,
    description: dto.description,
    priority: PRIORITY_MAP[dto.priority],
    status: STATUS_MAP[dto.status],
    isCompleted: dto.status === 'completed',
    dueDate: dto.dueDate?.toISOString() ?? null,
  };
}

export function updateTaskFrontendToApi(id: string, dto: UpdateTaskDto): UpdateTaskApiDto {
  return {
    id,
    title: dto.title ?? '',
    description: dto.description ?? '',
    priority: dto.priority ? PRIORITY_MAP[dto.priority] : PRIORITY_MAP.medium,
    status: dto.status ? STATUS_MAP[dto.status] : STATUS_MAP.pending,
    isCompleted: dto.status === 'completed',
    dueDate: dto.dueDate !== undefined ? (dto.dueDate?.toISOString() ?? null) : null,
  };
}
