import axios from "axios";
import { APIResponse } from "../types/api";
import { University } from "../types/university";
import { User } from "../types/user";

const UniversityService = {
    searchUniversity: async (query: string) => {
        const response: APIResponse<University[]> = {} as APIResponse<University[]>;
        try {
            const { data, status } = await axios.get<University[]>(`http://universities.hipolabs.com/search?name=${query}&limit=50`)
            if (data?.length) {
                response.status = '200'
                response.response = data;
            } else {
                response.status = '404'
            }
        } catch (err) {
            response.status = '500';
            response.error = {
                message: 'Fsiled to search',
                code: 'API_GENRIC_ERROR'
            }
        }
        return response;
    }
}

export default UniversityService