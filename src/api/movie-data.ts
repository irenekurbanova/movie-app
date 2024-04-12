import axios from "axios";
import { TMBD_GET_REQUEST } from "./config";

interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

export async function getMovieBySearch(query: string, page?: number) {
  let pageNumber;
  if (!page) {
    pageNumber = 1;
  } else pageNumber = page;
  try {
    const response = await TMBD_GET_REQUEST.get(`/search/movie?&language=ru-RU&page=${pageNumber}`, {
      params: { query: query },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getFavoriteMovieList(account_id: string, page: number = 1) {
  try {
    const response = await TMBD_GET_REQUEST.get(`/account/${account_id}/favorite/movies`, {
      params: {
        page: page,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

export async function addToFavorites(account_id: string, movie_id: string, action: string) {
  try {
    const response = await TMBD_GET_REQUEST.post(`/account/${account_id}/favorite`, {
      media_type: "movie",
      media_id: movie_id,
      favorite: action === "add" ? true : false,
    });

    if (response.status === 200) {
      return;
    }
  } catch (error) {
    throw new Error("Someting went wrong");
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
      console.error(error.response);
      // Do something with this error...
      const { message } = error;
      throw new Error(JSON.stringify(message));
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

export async function getMovies(page: number, sortBy: string, range?: number[], genres?: string) {
  const params = {
    include_adult: "false",
    include_video: "false",
    language: "ru-RU",
    page: page,
    certification_country: "US",
    sort_by: sortBy === "По популярности" ? "popularity.desc" : "vote_average.desc",
    "vote_count.gte": 1000,
    with_genres: genres,
    "primary_release_date.gte": range && range[0].toString() + "-" + "01" + "-" + "01",
    "primary_release_date.lte": range && range[1].toString() + "-" + "12" + "-" + "31",
  };

  try {
    const response = await TMBD_GET_REQUEST.get(`/discover/movie`, {
      params: params,
    });
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
