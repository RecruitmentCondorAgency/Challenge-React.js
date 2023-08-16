import { University } from './university'

export interface User {
	email: string
	password: string
	universities: University[]
}
