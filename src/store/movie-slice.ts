import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieDataProps } from "./store-types";
import { getFavoriteMovieList, getMovieBySearch, getMovies } from "@/api/movie-data";

const initialState: MovieDataProps = {
  query: "",
  movieList: { page: 0, results: [], total_pages: 0, total_results: 0 },
  favorites: { page: 0, results: [], total_pages: 0, total_results: 0 },
  page: 1,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setFavoritesList(state, action: PayloadAction<MovieDataProps["favorites"]>) {
      state.favorites = action.payload;
    },
    setMovieList(state, action: PayloadAction<MovieDataProps["movieList"]>) {
      state.movieList = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMoviesByFilters.fulfilled, (state, action) => {
      state.movieList = action.payload;
    });
    builder.addCase(fetchMoviesByName.fulfilled, (state, action) => {
      state.movieList = action.payload;
    });
    builder.addCase(fetchFavoriteMovies.fulfilled, (state, action) => {
      state.favorites = action.payload;
    });
  },
});

export const fetchMoviesByFilters = createAsyncThunk(
  "movies/fetchMoviesByFilters",
  async (data: { page: number; sortby: string; range: number[]; genres: string }) => {
    const { page, sortby, range, genres } = data;
    try {
      const data = await getMovies(page, sortby, range, genres);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchMoviesByName = createAsyncThunk(
  "movies/fetchMoviesByName",
  async (data: { query: string; page: number }) => {
    const { query, page } = data;
    try {
      const data = await getMovieBySearch(query, page);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchFavoriteMovies = createAsyncThunk("movies/fetchFavoriteMovies", async (account_id: string) => {
  try {
    let page = 1;
    const data = await getFavoriteMovieList(account_id);
    while (page < data.total_pages) {
      page += 1;
      const nextpage = await getFavoriteMovieList(account_id, page);
      data.results.push(...nextpage.results);
    }
    return data;
  } catch (error) {
    console.error(error);
  }
});

export const { setQuery, setFavoritesList, setMovieList, setPage } = moviesSlice.actions;
export { moviesSlice };
