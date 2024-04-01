import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, FormEvent, useState } from "react";
import { useFiltersDispatch } from "@/contexts/filters/filter-context";
import { useMoviesDispatch } from "@/contexts/movies/movie-context";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const dispatchFilters = useFiltersDispatch();
  const dispatchMovies = useMoviesDispatch();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!searchValue.length) {
      return;
    }
    dispatchFilters({ type: "setQuery", query: searchValue });
    dispatchFilters({ type: "setActiveFilter", filter: "select", active: false });
    dispatchFilters({ type: "setActiveFilter", filter: "search", active: true });
    dispatchMovies({ type: "setPage", page: 1 });
    setSearchValue("");
  }

  return (
    <Paper component="form" sx={{ flex: 1, display: "flex", alignItems: "center" }} onSubmit={handleSubmit}>
      <InputBase
        value={searchValue}
        required
        sx={{ ml: 1, flex: 1 }}
        placeholder="Поиск по названию"
        inputProps={{ "aria-label": "поиск по названию" }}
        onChange={handleChange}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default Search;
