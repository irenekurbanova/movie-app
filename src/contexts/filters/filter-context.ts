import { createContext, useContext, Dispatch } from "react";

export type FilterDataProps = {
  genres: { id: string; name: string; checked: boolean }[];
  sortBy: string;
  query: string;
  releaseYear: { min: number; max: number; pickedRange: number[] };
  activeFilter: { select: boolean; checkbox: boolean; range: boolean; search: boolean };
};

const initialFiltersData: FilterDataProps = {
  genres: [],
  sortBy: "По популярности",
  query: "",
  releaseYear: { min: 1960, max: 2024, pickedRange: [1987, 2001] },
  activeFilter: { select: false, checkbox: false, range: false, search: false },
};

const FiltersContext = createContext<FilterDataProps>(initialFiltersData);
const FiltersDispatchContext = createContext<Dispatch<Action>>(() => null);

type Action =
  | { type: "setQuery"; query: string }
  | { type: "setActiveFilter"; filter: string; active: boolean }
  | { type: "setInitialGenres"; genres: [] }
  | { type: "setCheckedGenre"; name: string[] }
  | { type: "setSortBy"; sortBy: string }
  | { type: "setReleaseYear"; yearRange: number[] }
  | { type: "clearFilters" };

function filterReducer(filtersState: FilterDataProps, action: Action): FilterDataProps {
  switch (action.type) {
    case "setQuery": {
      return { ...filtersState, query: action.query };
    }
    case "setActiveFilter": {
      return {
        ...filtersState,
        activeFilter: { ...initialFiltersData.activeFilter, [action.filter]: action.active },
      };
    }
    case "setInitialGenres": {
      return { ...filtersState, genres: action.genres };
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
      return { ...filtersState, sortBy: action.sortBy };
    }
    case "setReleaseYear": {
      return { ...filtersState, releaseYear: { ...filtersState.releaseYear, pickedRange: action.yearRange } };
    }
    case "clearFilters": {
      return {
        ...initialFiltersData,
        genres: filtersState.genres.map((genre) => {
          return { ...genre, checked: false };
        }),
      };
    }
    default: {
      return filtersState;
    }
  }
}

function useFiltersContext() {
  return useContext(FiltersContext);
}

function useFiltersDispatch() {
  return useContext(FiltersDispatchContext);
}

export {
  initialFiltersData,
  FiltersContext,
  FiltersDispatchContext,
  filterReducer,
  useFiltersContext,
  useFiltersDispatch,
};
