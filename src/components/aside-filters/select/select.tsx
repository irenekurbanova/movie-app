import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useMoviesContext, useMoviesDispatch } from "@/contexts/movies/movie-context";
import { getSortedMovies } from "@/api/movie-data";
import { useEffect, useState } from "react";

const SelectRatingData = {
  popularity: "По популярности",
  vote_average: "По рейтингу",
};

const SelectFilter = () => {
  const filtersData = useMoviesContext();
  const dispatch = useMoviesDispatch();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  function handleSelectChange(event: SelectChangeEvent) {
    dispatch({ type: "setSortBy", sortBy: event.target.value });
    dispatch({ type: "setActiveFilter", filter: "По популярности" });
  }

  useEffect(() => {
    async function fetchSortedMovieList() {
      if (filtersData.activeFilter === "По популярности") {
        const data = await getSortedMovies(filtersData.sortBy, filtersData.movieList.page);
        dispatch({ type: "setMovieList", data: data });
      } else return;
    }
    fetchSortedMovieList();
  }, [filtersData.sortBy, filtersData.movieList.page, dispatch, filtersData.activeFilter]);

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
