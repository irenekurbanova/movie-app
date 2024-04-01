import { createContext, useContext, Dispatch } from "react";

export type MovieProps = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
};

export type MovieDataProps = {
  movieList: { page: number; results: MovieProps[]; total_pages: number; total_results: number };
  favorites: { page: number; results: MovieProps[]; total_pages: number; total_results: number };
  page: number;
};

const initialMovieData: MovieDataProps = {
  movieList: { page: 1, results: [], total_pages: 0, total_results: 0 },
  favorites: { page: 1, results: [], total_pages: 0, total_results: 0 },
  page: 1,
};

const MoviesContext = createContext<MovieDataProps>(initialMovieData);
const MoviesDispatchContext = createContext<Dispatch<Action>>(() => null);

type Action =
  | { type: "setFavoritesList"; favorites: { page: number; results: []; total_pages: number; total_results: number } }
  | { type: "setMovieList"; data: { page: number; results: []; total_pages: number; total_results: number } }
  | { type: "setPage"; page: number };

function filterReducer(filtersState: MovieDataProps, action: Action): MovieDataProps {
  switch (action.type) {
    case "setMovieList": {
      return { ...filtersState, movieList: action.data };
    }
    case "setFavoritesList": {
      return { ...filtersState, favorites: action.favorites };
    }
    case "setPage": {
      return { ...filtersState, page: action.page };
    }
    default: {
      return filtersState;
    }
  }
}

function useMoviesContext() {
  return useContext(MoviesContext);
}

function useMoviesDispatch() {
  return useContext(MoviesDispatchContext);
}

export { initialMovieData, MoviesContext, MoviesDispatchContext, filterReducer, useMoviesContext, useMoviesDispatch };
