import { useReducer } from "react";
import { FiltersContext, FiltersDispatchContext, filterReducer, initialFiltersData } from "./filter-context";

type FiltersProviderProps = {
  children: JSX.Element;
};

export function FiltersProvider({ children }: FiltersProviderProps) {
  const [filtersData, dispatch] = useReducer(filterReducer, initialFiltersData);

  return (
    <FiltersContext.Provider value={filtersData}>
      <FiltersDispatchContext.Provider value={dispatch}>{children}</FiltersDispatchContext.Provider>
    </FiltersContext.Provider>
  );
}
