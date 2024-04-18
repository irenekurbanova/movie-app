import { useAppDispatch, useAppSelector } from "@/store/global-store";
import { Typography, Box, Slider } from "@mui/material";
import { setReleaseYear, setSearchActive } from "@/store/filter-slice";

function valuetext(value: number) {
  return `${value}`;
}

type MarksProps = {
  value: number;
};

type RangeSliderProps = {
  disabled: boolean;
};

const RangeSlider = ({ disabled }: RangeSliderProps) => {
  const releaseYear = useAppSelector((state) => state.filters.releaseYear);
  const searchActive = useAppSelector((state) => state.filters.searchActive);

  const dispatch = useAppDispatch();

  const marks = (): MarksProps[] => {
    const marksArray = [];
    let minStep = releaseYear.min;
    while (minStep <= releaseYear.max) {
      marksArray.push({ value: minStep });
      minStep += 8;
    }
    return marksArray;
  };

  const handleChange = (event: Event, newValue: number | number[]) => {
    searchActive && dispatch(setSearchActive(false));
    dispatch(setReleaseYear(newValue as number[]));
  };

  return (
    <Box width="100%" display="flex" flexDirection="column" gap={5}>
      <Typography variant="subtitle1">Год релиза:</Typography>
      <Slider
        disabled={disabled}
        getAriaLabel={() => "Temperature range"}
        step={1}
        shiftStep={8}
        marks={marks()}
        min={releaseYear.min}
        max={releaseYear.max}
        value={releaseYear.pickedRange}
        onChange={(event, newValue) => handleChange(event, newValue)}
        valueLabelDisplay="on"
        getAriaValueText={valuetext}
      />
    </Box>
  );
};

export default RangeSlider;
