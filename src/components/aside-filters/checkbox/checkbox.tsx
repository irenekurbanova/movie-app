import { useFiltersContext, useFiltersDispatch } from "@/contexts/filter-context/filter-context";
import { Autocomplete, TextField, Checkbox } from "@mui/material";
import { CheckBoxOutlineBlank, CheckBox } from "@mui/icons-material";

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

const CheckboxFilter = () => {
  const filtersData = useFiltersContext();
  const dispatch = useFiltersDispatch();
  const labels = filtersData.genres.map((genre) => genre.name);

  function handleChange(event: React.SyntheticEvent, value: string[]) {
    dispatch({ type: "setCheckedGenre", name: value });
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
      renderInput={(params) => <TextField {...params} variant="standard" label="Жанры" />}
    />
  );
};

export default CheckboxFilter;
