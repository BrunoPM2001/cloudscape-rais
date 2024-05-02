import axios from "axios";

const axiosBase = axios.create({
  baseURL: "http://localhost:8000/api/",
});

//  Token requests
axiosBase.defaults.headers.common["Authorization"] =
  localStorage.getItem("Auth") ?? "";

export default axiosBase;
