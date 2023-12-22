import api from ".";
import { University } from "../types/university";
import { Credentials } from "../types/user";
import { API_URLS } from "./apiUrls";

// Helper function to handle API errors
const handleAPIError = (error: any): null => {
  console.error("API Error:", error);
  return null;
};

// API base URLs
const universitiesBaseURL = API_URLS.universitiesSearch;
const loginBaseURL = API_URLS.login;
const registerBaseURL = API_URLS.register;
const favoriteBaseURL = API_URLS.favorite;

/**
 * Fetch universities based on the search input value.
 * @param inputValue - The search input value.
 * @param limit - The limit of results to fetch (default is 10).
 * @returns A promise that resolves to an array of universities or null in case of an error.
 */
export const getUniversitiesAPI = async (
  inputValue: string = "",
  limit: number = 10
): Promise<University[] | null> => {
  try {
    const response = await api.get({
      url: `${universitiesBaseURL}?name=${inputValue}&limit=${limit}`,
    });
    return response?.data || [];
  } catch (error) {
    return handleAPIError(error);
  }
};

/**
 * Validate a user based on the provided user ID.
 * @param userId - The user ID to validate.
 * @returns A promise that resolves to user credentials or null in case of an error.
 */
export const validateUserAPI = async (
  userId: string
): Promise<Credentials | null> => {
  try {
    const response = await api.get({
      url: `${loginBaseURL}?id=${userId}`,
    });
    return response?.data?.[0] || null;
  } catch (error) {
    return handleAPIError(error);
  }
};

/**
 * Log in a user based on the provided credentials.
 * @param credentials - The user credentials for login.
 * @returns A promise that resolves to user credentials or null in case of an error.
 */
export const loginUserAPI = async (
  credentials: Credentials
): Promise<Credentials | null> => {
  try {
    const response = await api.get({
      url: loginBaseURL,
      params: credentials,
    });
    return response?.data?.[0] || null;
  } catch (error) {
    return handleAPIError(error);
  }
};

/**
 * Register a new user based on the provided credentials.
 * @param credentials - The user credentials for registration.
 * @returns A promise that resolves to "success" or null in case of an error.
 */
export const registerUserAPI = async (
  credentials: Credentials
): Promise<string | null> => {
  try {
    await api.post({
      url: registerBaseURL,
      data: credentials,
    });
    return "success";
  } catch (error) {
    return handleAPIError(error);
  }
};

/**
 * Toggle the favorite status of universities for a user.
 * @param favorites - The list of favorite universities.
 * @param userId - The user ID.
 * @returns A promise that resolves to "success" or null in case of an error.
 */
export const toggleFavoriteStatusAPI = async (
  favorites: University[],
  userId: string
): Promise<string | null> => {
  try {
    await api.patch({
      url: `${favoriteBaseURL}/${userId}`,
      data: { universities: favorites },
    });
    return "success";
  } catch (error) {
    return handleAPIError(error);
  }
};
