/* eslint-disable @typescript-eslint/no-explicit-any */
import base, { AxiosRequestConfig } from 'axios';

export const instance = base.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
});

// Typescript data inference with intersectors is wrong, then i made personal methods

export function get<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>) {
  return instance.get<T>(url, config).then(response => response.data);
}

export function post<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
  return instance.post<T>(url, data, config).then(response => response.data);
}
