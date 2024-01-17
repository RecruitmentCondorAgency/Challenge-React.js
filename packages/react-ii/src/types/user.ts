import { IHttpState } from '../hooks/useFetch'
import { University } from './university'

export interface User {
	email: string
	password: string
	universities: University[]
}


export interface UserResponse extends IHttpState {
	universities: University[]
  }
  