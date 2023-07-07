import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Favorite, University, User } from "../types/types";

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

export const getUniversities = async () => {
	try {
		const response: AxiosResponse<University[]> = await api.get<User[]>("/universidades");
		return response.data;
	} catch (error) {
		throw new Error("Error al cargar datos");
	}
};

export const getFavorites = async (userId: number) => {
	try {
		const response: AxiosResponse<Favorite[]> = await api.get<Favorite[]>("/favorites", {
			params: {
				userId: userId,
			},
		});
		return response.data;
	} catch (error) {
		throw new Error("Error al iniciar sesión");
	}
};

export const saveFavorite = async (universityId: number, userId: number) => {
	try {
		const response = await api.post("/favorites", {
			userId,
			universityId,
		});

		if (response.status === 201) {
			console.log("Favorito guardado exitosamente");
		} else {
			console.error("Error al guardar el favorito");
		}
		return response.data;
	} catch (error) {
		console.error("Error al guardar el favorito:", error);
	}
};

export const deleteFavorite = async (universityId: number, userId: number) => {
	try {
		const response = await api.delete("/favorites", {
			params: {
				userId,
				universityId,
			},
		});

		console.log(response);

		if (response.status === 201) {
			console.log("Favorito eliminado exitosamente");
		} else {
			console.error("Error al eliminar el favoritooo");
		}
		return response.data.success;
	} catch (error) {
		console.error("Error al eliminar el favorito:", error);
	}
};

export const getCountryData = () => {
	fetch("https://restcountries.com/v3.1/name/{countryName}")
		.then((response) => response.json())
		.then((data) => {
			// Aquí puedes procesar los datos del país obtenidos
			console.log(data);
		})
		.catch((error) => {
			// Manejo de errores
			console.error(error);
		});
};
