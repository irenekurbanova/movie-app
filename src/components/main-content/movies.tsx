import { Box, Grid, Stack, Card, CardMedia, CardContent, CardActions, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import FavoriteButton from "../UI/buttons/favorite";
import UserAlert from "../UI/alert/alert";
import { useAppDispatch, useAppSelector } from "@/store/global-store";
import { fetchFavoriteMovies, fetchMoviesByFilters } from "@/store/movie-slice";

const Movies = function () {
  const filtersData = useAppSelector((state) => state.filters);
  const moviesData = useAppSelector((state) => state.movies);
  const account_id = useAppSelector((state) => state.authentication.session_id);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(function handleClose(event?: React.SyntheticEvent | Event, reason?: string) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }, []);

  const handleOpen = useCallback(function handleOpen() {
    setOpen(true);
  }, []);

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
  ]);

  return (
    <Box component="div" flex={1}>
      <Grid container spacing={2}>
        {moviesData.movieList.results.map((movie) => (
          <Grid item xs={12} sm={4} md={4} lg={4} key={movie.id} flexBasis={"100%"} display={"flex"}>
            <Card className="grid transition-all ease-in-out delay-150  hover:scale-105 duration-300">
              <Link to={`movies/${movie.id}`} className="no-underline">
                <CardMedia
                  width="500"
                  height="200"
                  component="img"
                  image={`https://image.tmdb.org/t/p/w500` + movie.backdrop_path}
                  alt={movie.title}
                />
              </Link>
              <Stack direction="row" justifyContent="space-between">
                <CardContent sx={{ padding: "8px" }}>
                  <Typography variant="subtitle2" color="text.primary" fontWeight={600}>
                    {movie.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Рейтинг {movie.vote_average.toFixed(1)}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <FavoriteButton openAlert={handleOpen} id={movie.id} key={movie.id} />
                </CardActions>
              </Stack>
            </Card>
          </Grid>
        ))}
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
