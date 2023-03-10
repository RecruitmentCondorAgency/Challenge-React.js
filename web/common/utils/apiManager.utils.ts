import axios, { ResponseType } from "axios";

type RequestConfig = {
  params?: any;
  data?: any;
  headers?: any;
  responseType?: ResponseType;
};

export const apiManager = {
  async get<T = any>(url: string, config: RequestConfig = {}) {
    const { params, responseType, headers } = config;
    return axios.get<T>(url, { params, headers, responseType });
  },

  async patch<T = any>(url: string, config: RequestConfig = {}) {
    const { params, data, responseType, headers } = config;
    return axios.patch<T>(url, data, { params, headers, responseType });
  },

  async post<T = any>(url: string, config: RequestConfig = {}) {
    const { params, data, responseType, headers } = config;
    return axios.post<T>(url, data, { params, headers, responseType });
  },

  async put<T = any>(url: string, config: RequestConfig = {}) {
    const { params, data, responseType, headers } = config;
    return axios.put<T>(url, data, { params, headers, responseType });
  },

  async delete<T = any>(url: string, config: RequestConfig = {}) {
    const { params, responseType, headers } = config;
    return axios.delete<T>(url, { params, headers, responseType });
  },
};
