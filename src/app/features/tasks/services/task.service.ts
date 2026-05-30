import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import type { TaskApiDto, CreateTaskApiDto, UpdateTaskApiDto } from '../../../core/models/api/task-api.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/todo`;

  getTasks(): Promise<TaskApiDto[]> {
    return firstValueFrom(this.http.get<TaskApiDto[]>(this.baseUrl));
  }

  getTaskById(id: string): Promise<TaskApiDto> {
    return firstValueFrom(this.http.get<TaskApiDto>(`${this.baseUrl}/${id}`));
  }

  createTask(dto: CreateTaskApiDto): Promise<TaskApiDto> {
    return firstValueFrom(this.http.post<TaskApiDto>(this.baseUrl, dto));
  }

  updateTask(id: string, dto: UpdateTaskApiDto): Promise<void> {
    return firstValueFrom(this.http.put<void>(`${this.baseUrl}/${id}`, dto));
  }

  deleteTask(id: string): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.baseUrl}/${id}`));
  }
}
