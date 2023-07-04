import axios, { AxiosInstance, AxiosResponse } from "axios";
import { User } from "../types/types";

const api: AxiosInstance = axios.create({
	baseURL: "http://localhost:3000",
});

export const login = async (user: User): Promise<User | null> => {
	try {
		const response: AxiosResponse<User[]> = await api.get<User[]>("/users", {
			params: {
				email: user.email,
				password: user.password,
			},
		});

		const users = response.data;
		if (users.length > 0) return users[0];
		return null;
	} catch (error) {
		throw new Error("Error al iniciar sesión");
	}
};
