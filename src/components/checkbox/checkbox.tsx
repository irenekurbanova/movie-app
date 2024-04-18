import { Autocomplete, TextField, Checkbox } from "@mui/material";
import { CheckBoxOutlineBlank, CheckBox } from "@mui/icons-material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/global-store";
import { setCheckedGenre, fetchInitialGenresList, setPickedGenres, setSearchActive } from "@/store/filter-slice";

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

type CheckboxFilterProps = {
  disabled: boolean;
};

const CheckboxFilter = ({ disabled }: CheckboxFilterProps) => {
  const searchActive = useAppSelector((state) => state.filters.searchActive);
  const genres = useAppSelector((state) => state.filters.genres);
  const dispatch = useAppDispatch();
  const labels = genres.map((genre) => genre.name);

  useEffect(() => {
    if (!genres.length) {
      dispatch(fetchInitialGenresList());
    }
  }, [dispatch, genres.length]);

  function handleChange(event: React.SyntheticEvent, value: string[]) {
    searchActive && dispatch(setSearchActive(false));
    dispatch(setCheckedGenre(value));
    dispatch(setPickedGenres());
  }

  return (
    <Autocomplete
      disabled={disabled}
      multiple
      limitTags={2}
      disableCloseOnSelect
      id="size-small-standard-multi"
      size="small"
      options={labels}
      value={genres.filter((genre) => genre.checked).map((genre) => genre.name)}
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
};

export default CheckboxFilter;
