import { Autocomplete, TextField, Checkbox } from "@mui/material";
import { CheckBoxOutlineBlank, CheckBox } from "@mui/icons-material";
import { getGenreList } from "@/api/movie-data";
import { memo, useEffect } from "react";
import { useFiltersContext, useFiltersDispatch } from "@/contexts/filters/filter-context";

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

const CheckboxFilter = memo(function CheckboxFilter() {
  const filtersData = useFiltersContext();
  const dispatch = useFiltersDispatch();
  const labels = filtersData.genres.map((genre) => genre.name);

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

  function handleChange(event: React.SyntheticEvent, value: string[]) {
    dispatch({ type: "setCheckedGenre", name: value });
    dispatch({ type: "setActiveFilter", filter: "checkbox", active: true });
  }

  return (
    <Autocomplete
      multiple
      limitTags={2}
      disableCloseOnSelect
      id="size-small-standard-multi"
      size="small"
      options={labels}
      getOptionLabel={(option) => option}
      onChange={handleChange}
      renderOption={(props, option, { selected }) => {
        return (
          <li {...props}>
            <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
            {option}
          </li>
        );
      }}
      renderInput={(params) => {
        return <TextField {...params} variant="standard" label="Жанры" />;
      }}
    />
  );
});

export default CheckboxFilter;
