import { InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/global-store";
import { clearFilters, setSearchActive } from "@/store/filter-slice";
import { setPage } from "@/store/movie-slice";
import { useDebounce } from "@/utilities/helpers";
import { fetchMoviesByName } from "@/store/movie-slice";

const Search = function Search() {
  const [searchValue, setSearchValue] = useState("");
  const debouncedQuery = useDebounce(searchValue);
  const filters = useAppSelector((state) => state.filters);
  const page = useAppSelector((state) => state.movies.page);
  const dispatch = useAppDispatch();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    !event.target.value.length && dispatch(setSearchActive(false));
    setSearchValue(event.target.value);
    dispatch(clearFilters());
    dispatch(setSearchActive(true));
    dispatch(setPage(1));
  }

  useEffect(() => {
    if (filters.searchActive) {
      const data = { query: debouncedQuery, page };
      dispatch(fetchMoviesByName(data));
    }
  }, [debouncedQuery, dispatch, filters.searchActive, page]);

  return (
    <Paper component="form" sx={{ flex: 1, padding: "4px", display: "flex", alignItems: "center" }}>
      <SearchIcon />
      <InputBase
        required
        sx={{ ml: 1, flex: 1 }}
        value={searchValue}
        placeholder="Поиск по названию"
        onChange={handleChange}
      />
    </Paper>
  );
};

export default Search;
