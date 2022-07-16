import axios from "axios";

const instance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-type": "application/json",
  },
});

export default instance;
