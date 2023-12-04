import { APIResponse } from "../types/api";
import { University } from "../types/university";
import { User } from "../types/user";

const UserService = {
    searchUniversity: async (user: User) => {
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

export default UserService