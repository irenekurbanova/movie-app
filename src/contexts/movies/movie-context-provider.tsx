import { useReducer } from "react";
import { MoviesContext, MoviesDispatchContext, filterReducer, initialMovieData } from "./movie-context";

type MovieProviderProps = {
  children: JSX.Element;
};

export function MovieProvider({ children }: MovieProviderProps) {
  const [filtersData, dispatch] = useReducer(filterReducer, initialMovieData);

  return (
    <MoviesContext.Provider value={filtersData}>
      <MoviesDispatchContext.Provider value={dispatch}>{children}</MoviesDispatchContext.Provider>
    </MoviesContext.Provider>
  );
}
