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
  location: string;
  country: string;
  capital: string;
  language: string;
  url: string;
  currency: string;
  population: number;
}

export interface User extends AuthUser {
  id: number;
  universities: number[];
}
