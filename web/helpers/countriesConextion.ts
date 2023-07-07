import axios, { AxiosResponse } from "axios";
import { CountryData } from "../types/types";

export const getCountryData = async (country: string): Promise<CountryData> => {
	try {
		const response: AxiosResponse<CountryData> = await axios.get(
			`https://restcountries.com/v3.1/name/${country}`
		);
		return response.data[0];
	} catch (error) {
		throw new Error("Error al cargar datos del país " + country);
	}
};
