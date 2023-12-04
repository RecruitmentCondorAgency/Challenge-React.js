import axios from "axios";
import { APIResponse } from "../types/api";
import { University } from "../types/university";
import { User } from "../types/user";

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
    loginUser: async (email: string, password: string) => {
        const response: APIResponse<User> = {} as APIResponse<User>;
        try {
            const { data, status } = await axios.get<User[]>(`http://localhost:3000/users?email=${email}&password=${password}`)
            if (data?.length) {
                response.status = '200'
                response.response = data[0];
            } else {
                response.status = '404'
            }
        } catch (err) {
            response.status = '500';
            response.error = {
                message: 'Fsiled to login User',
                code: 'API_GENRIC_ERROR'
            }
        }
        return response;
    },
    addFavouriteUniversity: async (user: User, university: University) => {
        const response: APIResponse<User> = {} as APIResponse<User>;
        const found = user?.universities.find((uni) => uni?.name === university?.name);
        const newList = [...user?.universities]
        if (!found) {
            newList.push(university)
            user.universities = newList
        }
        try {
            const { data, status } = await axios.put(`http://localhost:3000/users/${user?.id}`, {
                ...user,
                universities:newList
            })
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
    removeUniversityFromFavourites: async (user: User, university: University) => {
        const response: APIResponse<User> = {} as APIResponse<User>;
        const found = user?.universities.find((uni) => uni?.name === university?.name);
        let newList = [...user?.universities]
        if (found) {
            newList = newList?.filter((uni) => uni?.name !== university?.name);
        }
        try {
            const { data, status } = await axios.put(`http://localhost:3000/users/${user?.id}`, {
                ...user,
                universities:newList
            })
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

    getUserByEmail: async (email:string) => {
        const response: APIResponse<User> = {} as APIResponse<User>;
        try {
            const { data, status } = await axios.get<User[]>(`http://localhost:3000/users?email=${email}`)
            if (data?.length) {
                response.status = '200'
                response.response = data[0];
            } else {
                response.status = '404'
            }
        } catch (err) {
            response.status = '500';
            response.error = {
                message: 'Fsiled to search User',
                code: 'API_GENRIC_ERROR'
            }
        }
        return response;
    }
}

export default UserService