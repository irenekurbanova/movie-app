import { FormControl, InputLabel, NativeSelect } from "@mui/material";
import { useFiltersDispatch, useFiltersContext } from "@context/filter-context/filter-context";
import { getSortedMovies } from "@/api/fetchData";
import { useEffect } from "react";

const SelectRatingData = {
  popularity: "По популярности",
  vote_average: "По рейтингу",
};

const Select = () => {
  const filtersData = useFiltersContext();
  const dispatch = useFiltersDispatch();

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    dispatch({ type: "setSortBy", sortBy: event.target.value });
  }

  useEffect(() => {
    async function fetchSortedMovieList() {
      const data = await getSortedMovies(filtersData.sortBy, 1);
      const { page, results } = data;
      dispatch({ type: "setSortedMovies", data: { page, results } });
    }
    fetchSortedMovieList();
  }, [filtersData.sortBy, dispatch]);

  return (
    <FormControl fullWidth>
      <InputLabel variant="standard" htmlFor="rating-select">
        Сортировать по:
      </InputLabel>
      <NativeSelect
        defaultValue={SelectRatingData.popularity}
        inputProps={{
          name: "rating-select",
          id: "rating-select",
        }}
        onChange={handleSelectChange}
      >
        {Object.values(SelectRatingData).map((value) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default Select;
