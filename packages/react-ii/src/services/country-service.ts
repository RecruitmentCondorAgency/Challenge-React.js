import { APIResponse } from "../types/api";
import { Country } from "../types/country";
import { University } from "../types/university";
import { User } from "../types/user";

const CountryService = {
    fetchCountryDetails: async (county:Country) => {
        const response: APIResponse<User> = {} as APIResponse<User>;
        try {
            const response = await axios()
            response.response = response.json();
            response.status = '200'
        } catch (err) {
            response.status = '500';
            response.error = {
                message: 'Fsiled to register User',
                code: 'API_GENRIC_ERROR'
            }
        }
        return response;
    },
    fetchCountryWeather: async (county:Country) => {
        const response: APIResponse<User> = {} as APIResponse<User>;
        try {
            const response = await axios()
            response.response = response.json();
            response.status = '200'
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