import axios from "axios";

const API_ACCESS_TOKEN = import.meta.env.VITE_API_READ_ACCESS_TOKEN;
const API_URL = import.meta.env.VITE_BASE_URL;

const TMBD_GET_REQUEST = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${API_ACCESS_TOKEN}`,
  },
});

export async function getGenreList() {
  try {
    const response = await TMBD_GET_REQUEST.get("/genre/movie/list?language=ru");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getSortedMovies(sortBy: string, page: number = 1) {
  let url;
  sortBy === "По популярности"
    ? (url = `/movie/popular?language=ru-US&page=${page}`)
    : (url = `/movie/top_rated?language=ru-US&page=${page}`);
  try {
    const response = await TMBD_GET_REQUEST.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getMovieDetails(id: string) {
  try {
    const response = await TMBD_GET_REQUEST.get(`/movie/${id}?language=ru-RU`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getMovieCredits(id: number) {
  try {
    const response = await TMBD_GET_REQUEST.get(`/movie/${id}/credits?language=ru-RU`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
