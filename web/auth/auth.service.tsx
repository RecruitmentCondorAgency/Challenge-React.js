import axios from "axios";
import { User } from "../types";

const authService = {
  getAllUsers: async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/users");
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  createNewUser: async (user: User) => {
    try {
      const { data } = await axios.post("http://localhost:3000/users", user);
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  getUserUniversities: async (userId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/users/${userId}?_embed=universities`
      );
      return data;
    } catch (error) {
      console.error(error);
      return { universities: [] };
    }
  },
  saveNewFav: async (rawData) => {
    try {
      const { data: allUniversities } = await axios.get(
        `http://localhost:3000/universities`
      );
      const { data: response } = await axios.post(
        `http://localhost:3000/universities`,
        { ...rawData, id: allUniversities.length + 1 }
      );
      return response;
    } catch (error) {
      console.error(error);
      return {};
    }
  },
  deleteFav: async (universityId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/universities/${universityId}`
      );
      return data;
    } catch (error) {
      console.error(error);
      return {};
    }
  },
};

export { authService };
