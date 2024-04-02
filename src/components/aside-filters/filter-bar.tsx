import { IconButton, Paper, Typography, Box, Pagination } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SelectFilter from "./select/select";
import RangeSlider from "./range-slider/range-slider";
import CheckboxFilter from "./checkbox/checkbox";
import { useMoviesContext, useMoviesDispatch } from "@/contexts/movies/movie-context";
import { useFiltersDispatch } from "@/contexts/filters/filter-context";

const Filters = () => {
  const dispatch = useFiltersDispatch();
  const movieData = useMoviesContext();
  const dispatchMovies = useMoviesDispatch();

  function handlePaginationChange(event: React.ChangeEvent<unknown>, value: number) {
    dispatchMovies({ type: "setPage", page: value });
  }

  function clearFiltersHandler() {
    dispatch({ type: "clearFilters" });
  }

  return (
    <Paper sx={{ flex: 1, p: 2, display: "flex", flexDirection: "column", gap: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: "medium" }}>
          Фильтры
        </Typography>
        <IconButton onClick={clearFiltersHandler}>
          <CloseIcon />
        </IconButton>
      </Box>
      <SelectFilter />
      <RangeSlider />
      <CheckboxFilter />
      <Pagination
        page={movieData.movieList.page}
        siblingCount={0}
        count={movieData.movieList.total_pages < 500 ? movieData.movieList.total_pages : 500}
        sx={{ marginTop: "auto" }}
        onChange={handlePaginationChange}
      />
    </Paper>
  );
};

export default Filters;
