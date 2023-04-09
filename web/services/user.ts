import { get, post } from "./axios";
import { User } from "../types";

export async function login({email, password}: User) {
  const [logged] = await get<User[]>(`users?email=${email}&password=${password}`);
  if (!logged) throw new Error("Invalid email or password.");
  return logged;
}

export async function register({email, password}: User) {
  const [logged] = await get<User[]>(`users?email=${email}`);
  if (logged) throw new Error("User already exists.");

  return post<User>('users', {email, password});
}

const user = {
  login,
  register,
};

export default user;
