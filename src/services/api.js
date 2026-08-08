import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:8080/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

});

API.interceptors.response.use(

  (response) => response,

  (error) => {

    if (error.response?.status === 401) {

      localStorage.removeItem("token");
      localStorage.removeItem("email");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }

);

export default API;


// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8080/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Automatically attach JWT Token
// api.interceptors.request.use(
//   (config) => {

//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;

//   },
//   (error) => Promise.reject(error)
// );

// export default api;

// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8080/api"
// });

// export default api;

