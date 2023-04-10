export interface AuthUser {
  email: string;
  password?: string;
}

export interface Payload<T> {
  payload: T;
}

export interface University {
  id: number;
  name: string;
  country: string;
  language: string;
  url: string;
}

export interface User extends AuthUser {
  id: number;
  universities: number[];
}
