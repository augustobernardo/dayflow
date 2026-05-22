import { Injectable } from '@angular/core';
import type { Task, CreateTaskDto, UpdateTaskDto } from '../../../core/models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  // TODO: Integrate .NET Tasks API here
  // Replace mock delay/response with HttpClient calls to the .NET backend

  async getTasks(): Promise<Task[]> {
    // TODO: return firstValueFrom(this.http.get<Task[]>('/api/tasks'))
    console.log('[TaskService] getTasks - stub');
    return [];
  }

  async createTask(dto: CreateTaskDto): Promise<Task> {
    // TODO: return firstValueFrom(this.http.post<Task>('/api/tasks', dto))
    console.log('[TaskService] createTask - stub', dto);
    throw new Error('API not implemented');
  }

  async updateTask(id: string, dto: UpdateTaskDto): Promise<Task> {
    // TODO: return firstValueFrom(this.http.put<Task>(`/api/tasks/${id}`, dto))
    console.log('[TaskService] updateTask - stub', id, dto);
    throw new Error('API not implemented');
  }

  async deleteTask(id: string): Promise<void> {
    // TODO: return firstValueFrom(this.http.delete(`/api/tasks/${id}`))
    console.log('[TaskService] deleteTask - stub', id);
    throw new Error('API not implemented');
  }

  async toggleTask(id: string, completed: boolean): Promise<Task> {
    // TODO: return firstValueFrom(this.http.patch<Task>(`/api/tasks/${id}/toggle`, { completed }))
    console.log('[TaskService] toggleTask - stub', id, completed);
    throw new Error('API not implemented');
  }
}
