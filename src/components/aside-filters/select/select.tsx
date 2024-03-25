import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useFiltersDispatch, useFiltersContext } from "@context/filter-context/filter-context";
import { getSortedMovies } from "@/api/fetchData";
import { useEffect, useState } from "react";

const SelectRatingData = {
  popularity: "По популярности",
  vote_average: "По рейтингу",
};

const SelectFilter = () => {
  const filtersData = useFiltersContext();
  const dispatch = useFiltersDispatch();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  function handleSelectChange(event: SelectChangeEvent) {
    dispatch({ type: "setSortBy", sortBy: event.target.value });
  }

  useEffect(() => {
    async function fetchSortedMovieList() {
      const data = await getSortedMovies(filtersData.sortBy, filtersData.sortedMovies.page);
      const { page, results } = data;
      dispatch({ type: "setSortedMovies", data: { page, results } });
    }
    fetchSortedMovieList();
  }, [filtersData.sortBy, filtersData.sortedMovies.page, dispatch]);

  return (
    <FormControl fullWidth>
      <InputLabel variant="standard" htmlFor="demo-controlled-open-select-label">
        Сортировать по:
      </InputLabel>
      <Select
        variant="standard"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={filtersData.sortBy}
        id="rating-select"
        labelId="demo-controlled-open-select-label"
        onChange={handleSelectChange}
      >
        {Object.values(SelectRatingData).map((value) => (
          <MenuItem value={value} key={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectFilter;
