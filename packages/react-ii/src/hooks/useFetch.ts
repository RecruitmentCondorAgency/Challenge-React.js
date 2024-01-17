import axios, { AxiosRequestHeaders } from 'axios';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../config/config';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
type OptionsRequest = { method: HttpMethod, url: string, exactUrl?:boolean; body?: Record<string, string> }

export interface IHttpState {
    loading: boolean,
    data: any,
    error: unknown | null,
};

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const UseFetch = () => {
  const [state, setstate] = useState<IHttpState>(initialState);
  const axiosConfig: {headers: AxiosRequestHeaders} = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt_access_token') || ''}`,
    },
  };

  const httpMethod = (options: OptionsRequest, config) => {
    const { method, url, body } = options;
    const URI = !options.exactUrl ?  `http://localhost:3000${url}` : options.url
    if (method.toLowerCase() === 'get') return axios.get(URI, config);
    if (method.toLowerCase() === 'post') return axios.post(URI, body, config);
    if (method.toLowerCase() === 'put') return axios.put(URI, body, config);
    if (method.toLowerCase() === 'delete') return axios.delete(URI, config);
    return null;
  };

  const resetState = () => {
    setstate(initialState);
  };
  useEffect(() => {
    return () => {
      setstate(initialState);
    };
  }, []);
  const request = async (options:OptionsRequest, config = axiosConfig) => {
    let {url} = options;
    if (url) {
      try {
        setstate({
          ...state,
          loading: true,
        });
        const axiosResponse = await httpMethod(options, config);
        setstate({
          error: null,
          data: axiosResponse.data,
          loading: false,
        });
      } catch (error) {
        setstate({
          data: null,
          error: error.response.data,
          loading: false,
        });
      }
    }
  };
  return {state, request, resetState};
};

export default UseFetch;
