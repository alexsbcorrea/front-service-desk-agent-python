import axios from "axios";

export const URL = process.env.NEXT_PUBLIC_BASE_URL;

export const BASEURL = `${URL}`;

export const api = axios.create({
  baseURL: BASEURL,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.data.includes("ETIMEDOUT") &&
      error.response.status === 500
    ) {
      alert(`Servidor indisponível. Detalhes: ${error.response.data}`);
    }
    return Promise.reject(error);
  }
);
