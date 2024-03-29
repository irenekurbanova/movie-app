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
  isFavorite: boolean;
};

export type MovieDataProps = {
  genres: { id: string; name: string; checked: boolean }[];
  sortBy: string;
  releaseYear: { min: number; max: number; pickedRange: number[] };
  sortedMovies: { page: number; results: MovieProps[] };
  favorites: MovieProps[];
};

const initialMovieData: MovieDataProps = {
  genres: [],
  sortBy: "По популярности",
  releaseYear: { min: 1960, max: 2024, pickedRange: [1987, 2001] },
  sortedMovies: { page: 1, results: [] },
  favorites: [],
};

const MoviesContext = createContext<MovieDataProps>(initialMovieData);
const MoviesDispatchContext = createContext<Dispatch<Action>>(() => null);

type Action =
  | { type: "addFavorite"; isFavorite: boolean; id: string | string[] }
  | { type: "setFavoritesList"; favorites: [] }
  | { type: "setInitialGenres"; genres: [] }
  | { type: "setCheckedGenre"; name: string[] }
  | { type: "setSortBy"; sortBy: string }
  | { type: "setReleaseYear"; yearRange: number[] }
  | { type: "setSortedMovies"; data: { page: number; results: [] } }
  | { type: "setNextPage"; page: number };

function filterReducer(filtersState: MovieDataProps, action: Action): MovieDataProps {
  switch (action.type) {
    case "addFavorite": {
      return {
        ...filtersState,
        sortedMovies: {
          ...filtersState.sortedMovies,
          results: filtersState.sortedMovies.results.map((movie) => {
            if (action.id.includes(movie.id.toString())) {
              return { ...movie, isFavorite: action.isFavorite };
            } else return { ...movie };
          }),
        },
      };
    }
    case "setFavoritesList": {
      return { ...filtersState, favorites: action.favorites };
    }
    case "setInitialGenres": {
      return { ...filtersState, genres: action.genres };
    }
    case "setSortedMovies": {
      return { ...filtersState, sortedMovies: action.data };
    }
    case "setNextPage": {
      return { ...filtersState, sortedMovies: { ...filtersState.sortedMovies, page: action.page } };
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
      return { ...filtersState, sortBy: action.sortBy, sortedMovies: { ...filtersState.sortedMovies, page: 1 } };
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
