import { getGenreList } from "@/api/movie-data";
import { FilterDataProps } from "./store-types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: FilterDataProps = {
  query: "",
  genres: [],
  pickedGenres: "",
  sortBy: "По популярности",
  releaseYear: { min: 1960, max: 2024, pickedRange: [1987, 2024] },
  searchActive: false,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setSearchActive(state, action: PayloadAction<boolean>) {
      state.searchActive = action.payload;
    },
    setInitialGenres(state, action) {
      state.genres = action.payload;
    },
    setPickedGenres(state) {
      state.pickedGenres = state.genres
        .filter((genre) => genre.checked)
        .map((genre) => genre.id)
        .join(",");
    },
    setCheckedGenre(state, action) {
      state.genres = state.genres.map((genre) => {
        if (action.payload.includes(genre.name)) {
          return { ...genre, checked: true };
        } else {
          return { ...genre, checked: false };
        }
      });
    },
    setSortBy(state, action: PayloadAction<FilterDataProps["sortBy"]>) {
      state.sortBy = action.payload;
    },
    setReleaseYear(state, action: PayloadAction<number[]>) {
      state.releaseYear.pickedRange = action.payload;
    },
    clearFilters(state) {
      // state.activeFilter = initialState.activeFilter;
      state.query = initialState.query;
      state.releaseYear = initialState.releaseYear;
      state.sortBy = initialState.sortBy;
      state.pickedGenres = initialState.pickedGenres;
      state.genres = state.genres.map((genre) => {
        return { ...genre, checked: false };
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInitialGenresList.fulfilled, (state, action) => {
      state.genres = action.payload;
    });
  },
});

export const fetchInitialGenresList = createAsyncThunk("filters/fetchGenreList", async () => {
  try {
    const data = await getGenreList();

    const initGenreArray = data.genres.map((genre: { id: number; name: string }) => {
      return {
        id: genre.id.toString(),
        name: genre.name,
        checked: false,
      };
    });
    return initGenreArray;
  } catch (error) {
    console.error(error);
  }
});

export const {
  setQuery,
  // setActiveFilter,
  setSearchActive,
  setInitialGenres,
  setCheckedGenre,
  setSortBy,
  setReleaseYear,
  clearFilters,
  setPickedGenres,
} = filtersSlice.actions;

export { filtersSlice };
