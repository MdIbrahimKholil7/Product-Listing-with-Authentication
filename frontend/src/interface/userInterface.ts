export interface User {
  id: number;
  name: string;
  email: string;
  address: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  address: string;
}

export interface RegisterResponse {
  token: string;
  user: User;
}

export interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  address: string;
}
