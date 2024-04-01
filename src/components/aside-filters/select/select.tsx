import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { useFiltersContext, useFiltersDispatch } from "@/contexts/filters/filter-context";
import { useMoviesDispatch } from "@/contexts/movies/movie-context";

const SelectRatingData = {
  popularity: "По популярности",
  vote_average: "По рейтингу",
};

const SelectFilter = () => {
  const filtersData = useFiltersContext();
  const dispatchFilters = useFiltersDispatch();
  const dispatchMovies = useMoviesDispatch();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  function handleSelectChange(event: SelectChangeEvent) {
    dispatchFilters({ type: "setSortBy", sortBy: event.target.value });
    dispatchFilters({ type: "setActiveFilter", filter: "select", active: true });
    dispatchMovies({ type: "setPage", page: 1 });
  }

  return (
    <FormControl fullWidth>
      <InputLabel variant="standard" htmlFor="demo-controlled-open-select-label">
        Сортировать по:
      </InputLabel>
      <Select
        variant="standard"
        defaultOpen={true}
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
