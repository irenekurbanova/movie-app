import { Box, Grid, Stack, Card, CardMedia, CardContent, CardActions, Typography } from "@mui/material";
import { useMoviesContext, useMoviesDispatch } from "@/contexts/movies/movie-context";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getFavoriteMovieList, getMovieBySearch, getSortedMovies } from "@/api/movie-data";
import { useAuthContext } from "@/contexts/authentication/auth-context";
import FavoriteButton from "../buttons/favorite";

const Movies = () => {
  const moviesData = useMoviesContext();
  const authenticationData = useAuthContext();
  const dispatch = useMoviesDispatch();

  useEffect(() => {
    async function loadNextPage() {
      let data;
      if (moviesData.activeFilter === "По популярности") {
        data = await getSortedMovies(moviesData.sortBy, moviesData.movieList.page);
        dispatch({ type: "setMovieList", data: data });
      }
      if (moviesData.activeFilter === "Поиск") {
        data = await getMovieBySearch(moviesData.query, moviesData.movieList.page);
        dispatch({ type: "setMovieList", data: data });
      }
    }
    async function getFavorites() {
      const favoriteMovieList = await getFavoriteMovieList(authenticationData.session_id);
      dispatch({ type: "setFavoritesList", favorites: favoriteMovieList });
    }

    getFavorites();
    loadNextPage();
  }, [
    authenticationData,
    dispatch,
    moviesData.activeFilter,
    moviesData.movieList.page,
    moviesData.query,
    moviesData.sortBy,
  ]);

  return (
    <Box component="div">
      <Grid container spacing={2}>
        {moviesData.movieList.results.map((movie) => (
          <Grid item xs={4} key={movie.id}>
            <Card className="flex flex-col transition-all ease-in-out delay-150  hover:scale-110 duration-300">
              <Link to={`movies/${movie.id}`} className="no-underline">
                <CardMedia
                  component="img"
                  height="200"
                  image={`https://image.tmdb.org/t/p/w400` + movie.backdrop_path}
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
                  <FavoriteButton
                    id={movie.id.toString()}
                    isFavorite={moviesData.favorites.results.some((favorite) => favorite.id === movie.id)}
                    key={movie.id}
                  />
                </CardActions>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Movies;
