import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import UserAlert from "../alert/alert";
import { useAppDispatch, useAppSelector } from "@/store/global-store";
import { fetchFavoriteMovies, fetchMoviesByFilters, fetchMoviesByName } from "@/store/movie-slice";
import MoviesList from "./movies-list";

const Movies = function () {
  const filtersData = useAppSelector((state) => state.filters);
  const moviesData = useAppSelector((state) => state.movies);
  const account_id = useAppSelector((state) => state.authentication.session_id);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const handleClose = function handleClose(event?: React.SyntheticEvent | Event, reason?: string) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleOpen = function handleOpen() {
    setOpen(true);
  };

  useEffect(() => {
    async function dispatchChaining() {
      await Promise.all([dispatch(fetchFavoriteMovies(account_id))]);
      if (!filtersData.searchActive) {
        const data = {
          page: moviesData.page,
          sortby: filtersData.sortBy,
          range: filtersData.releaseYear.pickedRange,
          genres: filtersData.pickedGenres,
        };
        dispatch(fetchMoviesByFilters(data));
      } else {
        const data = {
          query: moviesData.query,
          page: moviesData.page,
        };
        dispatch(fetchMoviesByName(data));
      }
    }
    dispatchChaining();
  }, [
    account_id,
    dispatch,
    filtersData.pickedGenres,
    filtersData.releaseYear.pickedRange,
    filtersData.searchActive,
    filtersData.sortBy,
    moviesData.page,
    moviesData.query,
  ]);

  return (
    <Box component="div" flex={1}>
      <Grid container spacing={2}>
        <MoviesList data={moviesData.movieList.results} openAlert={handleOpen} />
      </Grid>
      <UserAlert
        open={open}
        onClose={handleClose}
        title="Ошибка"
        message="Фильм не добавлен в избранное. Проверьте соединение и попробуйте еще раз."
      />
    </Box>
  );
};

export default Movies;
