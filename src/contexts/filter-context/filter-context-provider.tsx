import { useReducer } from "react";
import { FilterContext, FilterDispatchContext, filterReducer, initialFiltersData } from "./filter-context";

type FilterProviderProps = {
  children: React.ReactNode;
};

export function FilterProvider({ children }: FilterProviderProps) {
  const [filtersData, dispatch] = useReducer(filterReducer, initialFiltersData);

  return (
    <FilterContext.Provider value={filtersData}>
      <FilterDispatchContext.Provider value={dispatch}>{children}</FilterDispatchContext.Provider>
    </FilterContext.Provider>
  );
}
