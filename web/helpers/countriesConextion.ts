import axios, { AxiosInstance, AxiosResponse } from "axios";
import { CountryData } from "../types/types";

import { REACT_APP_URL_COUNTRY } from "../configEnv1";

const api: AxiosInstance = axios.create({
	baseURL: REACT_APP_URL_COUNTRY,
});

export const getCountryData = async (country: string): Promise<CountryData> => {
	try {
		const response: AxiosResponse<CountryData> = await api.get(`/name/${country}`);
		return response.data[0];
	} catch (error) {
		throw new Error("Error al cargar datos del país " + country);
	}
};
