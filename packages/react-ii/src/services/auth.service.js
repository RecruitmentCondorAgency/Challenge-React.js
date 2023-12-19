import axios from 'axios';

const username = JSON.parse(sessionStorage.getItem("uid"));
const authAxios = axios.create({
	baseURL: "http://localhost:3000/"
});

authAxios.interceptors.request.use(
	(config) => {
		config.headers.Authorization = `Bearer ${username?.id}`;
		return config;
	},
	(error) => Promise.reject(error)
);

authAxios.interceptors.response.use(
	(response) => response,
	(error) => {
		const code = error && error.response ? error.response.status : 0;
		if (code === 401 || code === 403) {
			console.log('error code', code);
		}
		return Promise.reject(error);
	}
);

class AuthService {
	isLoginStorage() {
		if (username?.id) {
			return true;
		} else {
			return false;
		}
	}

  getUserApi = async (id) => {
		console.log("id", id);
    try {
			const {data} = await authAxios.get(`/users/${id}?_embed=userUniversities`);
			//console.log("user abc", data);
			return data;
    } catch (error) {
			console.log("in error", error);
    }
  }

	updateUserUnivApi = async (updateObject) => {
		console.log("updateObject", updateObject);
    try {
			const {data} = await authAxios.post(`/userUniversities`, updateObject);
			return data;
    } catch (error) {
			console.log("in error", error);
    }
  }

	deleteUserUnivApi = async (userUnivid) => {
		console.log("userUnivid", userUnivid);
    try {
			const { data } = await authAxios.delete(`/userUniversities/${userUnivid}`);
			console.log("user delete", data);
			return data;
    } catch (error) {
			console.log("in error", error);
    }
  }

	logoutStorage = () => {
		sessionStorage.removeItem("uid")
		return true;
	};
}

export const authService = new AuthService();
