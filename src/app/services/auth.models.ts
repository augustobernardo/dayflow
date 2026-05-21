export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  name: string;
  email: string;
  expiresAt: string;
}

export interface ApiError {
  message?: string;
  title?: string;
  status?: number;
  errors?: Record<string, string[]>;
}
