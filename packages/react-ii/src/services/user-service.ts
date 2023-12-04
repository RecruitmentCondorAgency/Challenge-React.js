import axios from "axios";
import { APIResponse } from "../types/api";
import { University } from "../types/university";
import { User } from "../types/user";

type GetUsersResponse = {
    users: User[];
  };

const UserService = {
    registerUser: async (user: User) => {
        const response: APIResponse<User> = {} as APIResponse<User>;
        try {
            const { data, status } = await axios.post("http://localhost:3000/users",user)
            response.response = data;
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
    loginUser: async (user: User) => {
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
    addFavouriteUniversity: async (user: User, university: University) => {
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
    removeUniversityFromFavourites: async (user: User, university: University) => {
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

    getUserByEmail: async (email:string) => {
        const response: APIResponse<User> = {} as APIResponse<User>;
        try {
            const { data, status } = await axios.get<GetUsersResponse>(`http://localhost:3000/users?email=${email}`)
            if (data?.users?.length) {
                response.status = '200'
                response.response = data.users[0];
            } else {
                response.status = '404'
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

export default UserService