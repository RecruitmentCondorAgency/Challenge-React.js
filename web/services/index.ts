import { get, patch, post } from "./axios";
import { AuthUser, University, User } from "../types";

export async function login({email, password}: AuthUser) {
  const [logged] = await get<User[]>(`users?email=${email}&password=${password || ''}`);
  if (!logged) throw new Error("Invalid email or password.");
  return logged;
}

export async function register({email, password}: AuthUser) {
  const [logged] = await get<[User]>(`users?email=${email}`);
  if (logged) throw new Error("User already exists.");

  return post<User>('users', {email, password, universities: []});
}

export function getUser(userId: number) {
  return get<User>(`users/${userId}`);
}

export async function updateUser(userId: number, data: Partial<User>) {
  return patch<User>(`users/${userId}`, data);
}

export async function findUniversities(query?: string) {
  return get<University[]>(`universities?q=${query || ''}`);
}

export async function getUniversities(keys?: number | number[]) {
  if (!keys) keys = [];
  if (!(keys instanceof Array)) keys = [keys];
  if (!keys.length) return get<University[]>("universities");

  const query = keys.map(key => `id=${key}`).join('&');
  return get<University[]>(`universities?${query}`);
}

export async function getUniversity(id?: number) {
  if (!id) return undefined;
  return get<University>(`universities/${id}`);
}

export async function getUserUniversityIds(userId: number): Promise<number[]> {
  const {universities: keys} = await get<User>(`users/${userId}`);
  return keys || [];
}

const services = {
  login,
  register,
  getUser,
  updateUser,
  findUniversities,
  getUniversities,
  getUniversity,
};

export default services;
