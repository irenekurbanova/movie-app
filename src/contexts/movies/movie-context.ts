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
  genres: { id: string; name: string; checked: boolean }[];
  sortBy: string;
  query: string;
  releaseYear: { min: number; max: number; pickedRange: number[] };
  activeFilter: string;
  movieList: { page: number; results: MovieProps[]; total_pages: number; total_results: number };
  favorites: { page: number; results: MovieProps[]; total_pages: number; total_results: number };
};

const initialMovieData: MovieDataProps = {
  genres: [],
  sortBy: "По популярности",
  query: "",
  releaseYear: { min: 1960, max: 2024, pickedRange: [1987, 2001] },
  activeFilter: "По популярности",
  movieList: { page: 1, results: [], total_pages: 0, total_results: 0 },
  favorites: { page: 1, results: [], total_pages: 0, total_results: 0 },
};

const MoviesContext = createContext<MovieDataProps>(initialMovieData);
const MoviesDispatchContext = createContext<Dispatch<Action>>(() => null);

type Action =
  | { type: "setQuery"; query: string }
  | { type: "setActiveFilter"; filter: string }
  | { type: "setFavoritesList"; favorites: { page: number; results: []; total_pages: number; total_results: number } }
  | { type: "setInitialGenres"; genres: [] }
  | { type: "setCheckedGenre"; name: string[] }
  | { type: "setSortBy"; sortBy: string }
  | { type: "setReleaseYear"; yearRange: number[] }
  | { type: "setMovieList"; data: { page: number; results: []; total_pages: number; total_results: number } }
  | { type: "setNextPage"; page: number };

function filterReducer(filtersState: MovieDataProps, action: Action): MovieDataProps {
  switch (action.type) {
    case "setQuery": {
      return { ...filtersState, query: action.query };
    }
    case "setActiveFilter": {
      return { ...filtersState, activeFilter: action.filter };
    }
    case "setFavoritesList": {
      return { ...filtersState, favorites: action.favorites };
    }
    case "setInitialGenres": {
      return { ...filtersState, genres: action.genres };
    }
    case "setMovieList": {
      return { ...filtersState, movieList: action.data };
    }
    case "setNextPage": {
      return { ...filtersState, movieList: { ...filtersState.movieList, page: action.page } };
    }
    case "setCheckedGenre": {
      return {
        ...filtersState,
        genres: filtersState.genres.map((genre) => {
          if (action.name.includes(genre.name)) {
            return { ...genre, checked: true };
          } else {
            return { ...genre, checked: false };
          }
        }),
      };
    }
    case "setSortBy": {
      return { ...filtersState, sortBy: action.sortBy, movieList: { ...filtersState.movieList, page: 1 } };
    }
    case "setReleaseYear": {
      return { ...filtersState, releaseYear: { ...filtersState.releaseYear, pickedRange: action.yearRange } };
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
