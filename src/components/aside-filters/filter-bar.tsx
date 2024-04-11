import { IconButton, Paper, Typography, Box, Pagination } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SelectFilter from "./select/select";
import RangeSlider from "./range-slider/range-slider";
import CheckboxFilter from "./checkbox/checkbox";
import { useAppDispatch, useAppSelector } from "@/store/global-store";
import { clearFilters } from "@/store/filter-slice";
import { setPage } from "@/store/movie-slice";

const Filters = () => {
  const movieData = useAppSelector((state) => state.movies);
  const dispatch = useAppDispatch();

  function handlePaginationChange(event: React.ChangeEvent<unknown>, value: number) {
    dispatch(setPage(value));
  }

  function clearFiltersHandler() {
    dispatch(clearFilters());
    dispatch(setPage(1));
  }

  return (
    <Paper sx={{ flex: 1, p: 2, display: "flex", flexDirection: "column", gap: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight="medium">
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
