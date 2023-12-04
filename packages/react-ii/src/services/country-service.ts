import axios from "axios";
import { APIResponse } from "../types/api";
import { Country } from "../types/country";

const CountryService = {
    fetchCountryDetails: async (countryCode: string) => {
        const response: APIResponse<Country> = {} as APIResponse<Country>;
        try {
            const {data, status} = await axios.get<Country[]>(`https://restcountries.com/v3.1/alpha/${countryCode}`)
            if (data?.length) {

                response.response = data[0];
                response.status = '200'
            } else {

                response.response = null;
                response.status = '200'
            }
        } catch (err) {
            response.status = '500';
            response.error = {
                message: 'Fsiled to register User',
                code: 'API_GENRIC_ERROR'
            }
        }
        return response;
    }
}

export default CountryService