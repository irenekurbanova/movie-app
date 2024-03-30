import { IconButton, Paper, Typography, Box, Pagination } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Select from "./select/select";
import RangeSlider from "./range-slider/range-slider";
import CheckboxFilter from "./checkbox/checkbox";
import { useMoviesContext, useMoviesDispatch } from "@/contexts/movies/movie-context";

const Filters = () => {
  const movieData = useMoviesContext();
  const dispatch = useMoviesDispatch();

  function handlePaginationChange(event: React.ChangeEvent<unknown>, value: number) {
    dispatch({ type: "setNextPage", page: value });
  }

  return (
    <Paper sx={{ flex: 1, p: 2, display: "flex", flexDirection: "column", gap: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: "medium" }}>
          Фильтры
        </Typography>
        <IconButton>
          <CloseIcon />
        </IconButton>
      </Box>
      <Select />
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
