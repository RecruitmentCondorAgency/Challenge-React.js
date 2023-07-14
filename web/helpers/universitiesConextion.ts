import axios, { AxiosResponse } from "axios";
import { University } from "../types/types";

export const getUniversities = async (): Promise<any> => {
	try {
		const response: AxiosResponse<University[]> = await axios.get("http://universities.hipolabs.com/search?name=middle");
		return response.data;
	} catch (error) {
		throw new Error("Error al obtener las universidades: " + error.message);
	}
};

