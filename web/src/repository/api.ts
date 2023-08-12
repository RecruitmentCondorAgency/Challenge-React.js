import axios from 'axios';
import { User } from '../types/user';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

function registerUser(user: Omit<User, 'universities'>) {
  const newUser: User = { ...user, universities: [] };
  return api
    .post<typeof newUser>('/users', newUser)
    .then((response) => response.data);
}

export const userAPI = {
  registerUser,
};
