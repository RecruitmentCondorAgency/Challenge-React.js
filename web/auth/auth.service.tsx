import axios from "axios";
import { User } from "../types";

const authService = {
  getAllUsers: async () => {
    const { data } = await axios.get("http://localhost:3000/users");
    return data;
  },
  createNewUser: async (user: User) => {
    const { data } = await axios.post("http://localhost:3000/users", user);
    return data;
  }
};

export { authService };
