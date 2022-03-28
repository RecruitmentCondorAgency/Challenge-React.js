export interface University {
  country: string
  name: string, domains: string[]
  alpha_two_code: string
  "state-province": string | null
  web_pages: string[]
}

export interface SelectedUniversity extends University {
  description?: string
}

export interface User {
  id: number
  avatar?: string
  email: string
  password: string
  name: string
  lastname: string
}

export interface UserState {
  user: User | null,
  universities: SelectedUniversity[]
  university: SelectedUniversity | null
  loading: boolean
}

export type PatchUser = Partial<User & {universities: SelectedUniversity[]}>
