import axios from "axios";

const axiosBase = axios.create({
  baseURL: "http://localhost:8000/api/",
});

//  Token requests
axiosBase.defaults.headers.common.Authorization =
  localStorage.getItem("Auth") ?? "";

//  Handle some status code
axiosBase.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.clear();
        window.location.href = "/";
        console.error("Unauthorized");
      } else if (error.response.status === 404) {
        // localStorage.clear();
        // window.location.href = "/";
        console.error("Server error");
      }
    } else if (error.request) {
      console.error("No response of server: ", error.request);
    } else {
      console.error("Error: ", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosBase;
