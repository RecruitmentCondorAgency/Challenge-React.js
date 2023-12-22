import api from ".";
import { University } from "../types/university";
import { Credentials } from "../types/user";
import { API_URLS } from "./apiUrls";

export const getUniversitiesAPI = async (
  inputValue: string = "",
  limit: number = 10
) => {
  try {
    const response = await api.get({
      url: `${API_URLS.universitiesSearch}?name=${inputValue}&limit=${limit}`, // later pagination can be implemented
    });

    const suggestions = response.data;
    return suggestions;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return;
  }
};

export const validateUserAPI = async (userId: string) => {
  try {
    const response = await api.get({
      url: API_URLS.login,
      params: { id: userId },
    });
    const user = response?.data?.[0];
    return user;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return;
  }
};

export const loginUserAPI = async (credentials: Credentials) => {
  try {
    const response = await api.get({
      url: API_URLS.login,
      params: credentials,
    });
    const user = response?.data?.[0];
    return user;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return;
  }
};

export const registerUserAPI = async (credentials: Credentials) => {
  try {
    await api.post({
      url: API_URLS.register,
      data: credentials,
    });
    return "success";
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return;
  }
};

export const toggleFavoriteStatusAPI = async (
  favorites: University[],
  userId: string
) => {
  try {
    await api.patch({
      url: `${API_URLS.favorite}/${userId}`,
      data: { universities: favorites },
    });
    return "success";
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return;
  }
};
