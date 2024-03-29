import axios from "axios";

const API_ACCESS_TOKEN = import.meta.env.VITE_API_READ_ACCESS_TOKEN;
const API_URL = import.meta.env.VITE_BASE_URL;

const TMBD_GET_REQUEST = axios.create({
  baseURL: API_URL,
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: `Bearer ${API_ACCESS_TOKEN}`,
  },
});

export { API_ACCESS_TOKEN, API_URL, TMBD_GET_REQUEST };
