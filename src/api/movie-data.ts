import axios from "axios";
import { TMBD_GET_REQUEST } from "./config";

interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

export async function getMovieBySearch(query: string, page: number = 1) {
  try {
    const response = await TMBD_GET_REQUEST.get(`/search/movie?include_adult=true&language=ru-RU&page=${page}`, {
      params: { query: query },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getFavoriteMovieList(account_id: string) {
  try {
    const response = await TMBD_GET_REQUEST.get(`/account/${account_id}/favorite/movies`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function addToFavorites(account_id: string, movie_id: string, action: string) {
  try {
    TMBD_GET_REQUEST.post(`/account/${account_id}/favorite`, {
      media_type: "movie",
      media_id: movie_id,
      favorite: action === "add" ? true : false,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getGenreList() {
  try {
    const response = await TMBD_GET_REQUEST.get("/genre/movie/list?language=ru");

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      console.log(error.status);
      console.error(error.response);
      // Do something with this error...
    } else {
      // console.error(error);
    }
  }
}

export async function getSortedMovies(sortBy: string, page: number = 1) {
  let url;
  sortBy === "По популярности"
    ? (url = `/movie/popular?language=ru-US&page=${page}`)
    : (url = `/movie/top_rated?language=ru-US&page=${page}`);
  try {
    const response = await TMBD_GET_REQUEST.get(url);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      console.log(error.status);
      console.error(error.response);
      // Do something with this error...
    } else {
      console.error(error);
    }
  }
}

export async function getMovieDetails(id: string) {
  try {
    const response = await TMBD_GET_REQUEST.get(`/movie/${id}?language=ru-RU`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      console.log(error.status);
      console.error(error.response);
      // Do something with this error...
    } else {
      console.error(error);
    }
  }
}

export async function getMovieCredits(id: number) {
  try {
    const response = await TMBD_GET_REQUEST.get(`/movie/${id}/credits?language=ru-RU`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      console.log(error.status);
      console.error(error.response);
      // Do something with this error...
    } else {
      console.error(error);
    }
  }
}
