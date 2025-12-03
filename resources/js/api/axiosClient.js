import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Laravel backend
});

export default axiosClient;
