import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/global-store";
import { setSortBy } from "@/store/filter-slice";
import { setPage } from "@/store/movie-slice";

const SelectRatingData = {
  popularity: "По популярности",
  vote_average: "По рейтингу",
};

const SelectFilter = function SelectFilter() {
  const filtersData = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  function handleSelectChange(event: SelectChangeEvent) {
    dispatch(setSortBy(event.target.value));
    // if (!filtersData.activeFilter.select) {
    //   dispatch(setActiveFilter("select"));
    //   dispatch(setActiveFilter("search"));
    // }
    dispatch(setPage(1));
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
