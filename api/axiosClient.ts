import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://cross-platform.rp.devfactory.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
