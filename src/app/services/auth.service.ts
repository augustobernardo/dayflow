import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import type { AuthResponse, RegisterRequest, LoginRequest, ApiError } from './auth.models';

const TOKEN_KEY = 'dayflow_token';
const USER_KEY = 'dayflow_user';

interface UserData {
  name: string;
  email: string;
}

function getStoredUser(): UserData | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/auth`;

  private _currentUser = signal<UserData | null>(getStoredUser());
  private _token = signal<string | null>(localStorage.getItem(TOKEN_KEY));

  readonly currentUser = computed(() => this._currentUser());
  readonly isAuthenticated = computed(() => !!this._token());
  readonly token = computed(() => this._token());

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, request).pipe(
      tap((response) => this.handleAuthResponse(response)),
      catchError((error) => throwError(() => this.mapError(error))),
    );
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, request).pipe(
      tap((response) => this.handleAuthResponse(response)),
      catchError((error) => throwError(() => this.mapError(error))),
    );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this._token.set(null);
    this._currentUser.set(null);
  }

  private handleAuthResponse(response: AuthResponse): void {
    localStorage.setItem(TOKEN_KEY, response.token);
    localStorage.setItem(USER_KEY, JSON.stringify({ name: response.name, email: response.email }));
    this._token.set(response.token);
    this._currentUser.set({ name: response.name, email: response.email });
  }

  private mapError(error: unknown): ApiError {
    if (error && typeof error === 'object' && 'error' in error) {
      const httpError = error as { error: ApiError; status: number };
      return {
        message: httpError.error?.message ?? httpError.error?.title ?? this.statusMessage(httpError.status),
        status: httpError.status,
        errors: httpError.error?.errors,
      };
    }
    return { message: 'Unexpected error occurred. Please try again later.' };
  }

  private statusMessage(status: number): string {
    const messages: Record<number, string> = {
      401: 'Invalid email or password.',
      409: 'An account with this email already exists.',
      0: 'Could not connect to the server. Please check your connection.',
    };
    return messages[status] ?? `Request failed (${status}). Please try again later.`;
  }
}
