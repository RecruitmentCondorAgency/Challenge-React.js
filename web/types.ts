export interface AuthUser {
  email: string;
}

export interface Payload<T> {
  payload: T;
}

export interface User extends AuthUser {
  id?: number;
  password: string;
}
