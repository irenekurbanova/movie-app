import { IconButton, Paper, Typography, Box, Pagination } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Select from "./select/select";
import RangeSlider from "./range-slider/range-slider";
import CheckboxFilter from "./checkbox/checkbox";
import { useFiltersDispatch, useFiltersContext } from "@context/filter-context/filter-context";
import { useEffect } from "react";
import { getGenreList, getSortedMovies } from "@api/fetchData";

const Filters = () => {
  const filtersData = useFiltersContext();
  const dispatch = useFiltersDispatch();

  useEffect(() => {
    async function fetchGenres() {
      const data = await getGenreList();
      const initGenreArray = data.genres.map((genre: { id: number; name: string }) => {
        return {
          id: genre.id.toString(),
          name: genre.name,
          checked: false,
        };
      });
      dispatch({ type: "setInitialGenres", genres: initGenreArray });
    }
    fetchGenres();
  }, [dispatch]);

  function handlePaginationChange(event: React.ChangeEvent<unknown>, value: number) {
    dispatch({ type: "setNextPage", page: value });
  }

  useEffect(() => {
    async function loadNextPage() {
      const data = await getSortedMovies(filtersData.sortBy, filtersData.sortedMovies.page);
      dispatch({ type: "setSortedMovies", data: data });
    }
    loadNextPage();
  }, [filtersData.sortBy, filtersData.sortedMovies.page, dispatch]);

  return (
    <Paper sx={{ flex: 1, p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
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
        page={filtersData.sortedMovies.page}
        siblingCount={0}
        count={500}
        sx={{ marginTop: "auto" }}
        onChange={handlePaginationChange}
      />
    </Paper>
  );
};

export default Filters;
