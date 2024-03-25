import { createContext, useContext, Dispatch } from "react";

type FiltersDataProps = {
  genres: { id: string; name: string; checked: boolean }[];
  sortBy: string;
  releaseYear: { min: number; max: number; pickedRange: number[] };
  sortedMovies: {
    page: number;
    results: {
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
    }[];
  };
};

const initialFiltersData: FiltersDataProps = {
  genres: [],
  sortBy: "По популярности",
  releaseYear: { min: 1960, max: 2024, pickedRange: [1987, 2001] },
  sortedMovies: { page: 1, results: [] },
};

const FilterContext = createContext<FiltersDataProps>(initialFiltersData);
const FilterDispatchContext = createContext<Dispatch<Action>>(() => null);

type Action =
  | { type: "setInitialGenres"; genres: [] }
  | { type: "setCheckedGenre"; name: string[] }
  | { type: "setSortBy"; sortBy: string }
  | { type: "setReleaseYear"; yearRange: number[] }
  | { type: "setSortedMovies"; data: { page: number; results: [] } }
  | { type: "setNextPage"; page: number };

function filterReducer(filtersState: FiltersDataProps, action: Action): FiltersDataProps {
  switch (action.type) {
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

function useFiltersContext() {
  return useContext(FilterContext);
}

function useFiltersDispatch() {
  return useContext(FilterDispatchContext);
}

export {
  initialFiltersData,
  FilterContext,
  FilterDispatchContext,
  filterReducer,
  useFiltersContext,
  useFiltersDispatch,
};
