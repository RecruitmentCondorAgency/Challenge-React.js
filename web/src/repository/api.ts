import axios from 'axios';
import { User } from '../types/user';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

type smallUser = Omit<User, 'universities' | 'id'>;

function registerUser(user: smallUser) {
  const newUser: User = { ...user, universities: [] };
  return api
    .post<typeof newUser>('/users', newUser)
    .then((response) => response.data);
}

function loginUser(user: smallUser) {
  return api.get<User[]>('/users').then((response) => {
    const userRegister = response.data.filter((u) => {
      const sameEmail = u.email === user.email;
      const samePassword = u.password === user.password;
      return sameEmail && samePassword;
    });
    if (userRegister.length === 1) {
      return userRegister[0];
    } else {
      throw Error('bad credentials');
    }
  });
}

export const userAPI = {
  registerUser,
  loginUser,
};
