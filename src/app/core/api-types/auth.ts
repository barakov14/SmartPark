export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
}
