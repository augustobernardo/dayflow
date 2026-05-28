import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import type { AuthResponse, RegisterRequest, LoginRequest, ApiError } from './auth.models';
import { Router } from '@angular/router';
import type { UserData } from '../core/models/user.model';

const TOKEN_KEY = 'dayflow_token';
const USER_KEY = 'dayflow_user';

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
  private _tokenExpiry = signal<number | null>(this.getStoredExpiry());

  private _router = inject(Router);

  readonly currentUser = computed(() => this._currentUser());
  readonly isAuthenticated = computed(() => {
    if (!this._token()) return false;
    const expiry = this._tokenExpiry();
    if (expiry && Date.now() >= expiry) {
      this.logout();
      return false;
    }
    return true;
  });
  readonly token = computed(() => {
    if (!this.isAuthenticated()) return null;
    return this._token();
  });

  private getStoredExpiry(): number | null {
    const raw = localStorage.getItem('dayflow_token_expiry');
    return raw ? Number(raw) : null;
  }

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
    localStorage.removeItem('dayflow_token_expiry');
    localStorage.removeItem(USER_KEY);
    this._token.set(null);
    this._tokenExpiry.set(null);
    this._currentUser.set(null);
    this._router.navigate(['/login']);
  }

  private handleAuthResponse(response: AuthResponse): void {
    const expiresAt = new Date(response.expiresAt).getTime();

    localStorage.setItem(TOKEN_KEY, response.token);
    localStorage.setItem('dayflow_token_expiry', String(expiresAt));
    localStorage.setItem(
      USER_KEY,
      JSON.stringify({
        name: response.name,
        email: response.email,
        firstName: response.name.split(' ')[0],
      }),
    );
    this._token.set(response.token);
    this._tokenExpiry.set(expiresAt);

    this._currentUser.set({
      name: response.name,
      email: response.email,
      firstName: response.name.split(' ')[0],
    });
  }

  private mapError(error: unknown): ApiError {
    if (error && typeof error === 'object' && 'error' in error) {
      const httpError = error as { error: ApiError; status: number };
      return {
        message:
          this.statusMessage(httpError.status) ??
          httpError.error?.message ??
          httpError.error?.title,
        status: httpError.status,
        errors: httpError.error?.errors,
      };
    }
    return { message: 'Unexpected error occurred. Please try again later.' };
  }

  private statusMessage(status: number): string {
    const messages: Record<number, string> = {
      401: 'Invalid email or password.',
      409: 'Please try with a different email address.',
      0: 'Could not connect to the server. Please check your connection.',
    };
    return messages[status] ?? `Request failed (${status}). Please try again later.`;
  }
}
