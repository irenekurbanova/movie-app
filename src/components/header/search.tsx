import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getMovieBySearch } from "@/api/movie-data";
import { MovieProps, useMoviesContext, useMoviesDispatch } from "@/contexts/movies/movie-context";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const movieData = useMoviesContext();
  const dispatch = useMoviesDispatch();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!searchValue.length) {
      return;
    }
    dispatch({ type: "setQuery", query: searchValue });
    dispatch({ type: "setActiveFilter", filter: "Поиск" });
    setSearchValue("");
  }

  useEffect(() => {
    async function getSearchList() {
      const movieList = await getMovieBySearch(movieData.query);
      const results = movieList.results.map((results: MovieProps) => {
        return {
          ...results,
          isFavorite: false,
        };
      });
      dispatch({ type: "setMovieList", data: { ...movieList, results: results } });
    }
    getSearchList();
  }, [movieData.query, dispatch]);

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
