import { PatchUser, University, User } from '../../store/user/types'
import axios from '../interceptor'

const base = 'http://localhost:3000/users'

const getUser = (data: {email: string, password: string}) => {
  return axios.get<(User & {universities: University[]})[]>(base, {
    params: {...data}
  })
}

const postUser = (user: Omit<User, 'id'>) => {
  return axios.post<User[]>(base, {...user, universities: []})
}

const patchUser = (id: number, user: PatchUser) => {
  return axios.patch<Required<PatchUser>>(`${base}/${id}`, user)
}

export default {
  getUser,
  postUser,
  patchUser
}