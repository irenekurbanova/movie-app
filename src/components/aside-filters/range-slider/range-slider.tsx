// import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
import { useFiltersContext, useFiltersDispatch } from "../../../contexts/filter-context/filter-context";

function valuetext(value: number) {
  return `${value}`;
}

type MarksProps = {
  value: number;
};

const RangeSlider = () => {
  const dispatch = useFiltersDispatch();
  const filtersData = useFiltersContext();

  const marks = (): MarksProps[] => {
    const marksArray = [];
    let minStep = filtersData.releaseYear.min;
    while (minStep <= filtersData.releaseYear.max) {
      marksArray.push({ value: minStep });
      minStep += 8;
    }
    return marksArray;
  };

  const handleChange = (event: Event, newValue: number | number[]) => {
    dispatch({ type: "setReleaseYear", yearRange: newValue as number[] });
  };

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 5 }}>
      <Typography variant="subtitle1">Год релиза:</Typography>
      <Slider
        getAriaLabel={() => "Temperature range"}
        step={1}
        shiftStep={8}
        marks={marks()}
        min={filtersData.releaseYear.min}
        max={filtersData.releaseYear.max}
        value={filtersData.releaseYear.pickedRange}
        onChange={(event, newValue) => handleChange(event, newValue)}
        valueLabelDisplay="on"
        getAriaValueText={valuetext}
      />
    </Box>
  );
};

export default RangeSlider;
