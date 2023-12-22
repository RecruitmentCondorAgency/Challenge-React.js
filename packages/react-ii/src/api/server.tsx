import axios, { AxiosInstance } from "axios";

// const   BASE_URL = "http://loalhost:3000/"

const server: AxiosInstance = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default server;
