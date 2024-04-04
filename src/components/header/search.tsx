import { InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, useEffect, useState } from "react";
import { useFiltersDispatch } from "@/contexts/filters/filter-context";
import { useMoviesContext, useMoviesDispatch } from "@/contexts/movies/movie-context";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const moviesData = useMoviesContext();
  const dispatchFilters = useFiltersDispatch();
  const dispatchMovies = useMoviesDispatch();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.value.length) {
      dispatchFilters({ type: "setActiveFilter", filter: "select", active: true });
      return;
    }
    setSearchValue(event.target.value);
    dispatchFilters({ type: "setActiveFilter", filter: "search", active: true });
  }

  useEffect(() => {
    const getQuery = setTimeout(() => {
      dispatchFilters({ type: "setQuery", query: searchValue });
      dispatchMovies({ type: "setPage", page: moviesData.page });
    }, 1500);
    return () => clearTimeout(getQuery);
  }, [dispatchFilters, dispatchMovies, moviesData.page, searchValue]);

  return (
    <Paper component="form" sx={{ flex: 1, padding: "4px", display: "flex", alignItems: "center" }}>
      <SearchIcon />
      <InputBase required sx={{ ml: 1, flex: 1 }} placeholder="Поиск по названию" onChange={handleChange} />
    </Paper>
  );
};

export default Search;
