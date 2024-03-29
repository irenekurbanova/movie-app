import { Box, Grid, Stack, Card, CardMedia, CardContent, CardActions, IconButton, Typography } from "@mui/material";
import { MovieProps, useMoviesContext, useMoviesDispatch } from "@/contexts/movies/movie-context";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { addToFavorites, getFavoriteMovieList } from "@/api/movie-data";
import { useAuthContext } from "@/contexts/authentication/auth-context";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Movies = () => {
  const moviesData = useMoviesContext();
  const authenticationData = useAuthContext();
  const dispatch = useMoviesDispatch();

  useEffect(() => {
    async function getFavorites() {
      const favMovies = await getFavoriteMovieList(authenticationData.session_id);
      dispatch({ type: "setFavoritesList", favorites: favMovies.results });
      const id = favMovies.results.map((movie: MovieProps) => movie.id.toString());
      dispatch({ type: "addFavorite", isFavorite: true, id: id });
    }
    getFavorites();
  }, [authenticationData, dispatch]);

  async function handleAddToFavorites(movie_id: string) {
    try {
      const currentMovieIsFavorite = moviesData.sortedMovies.results.filter(
        (movie) => movie.id.toString() === movie_id
      )[0].isFavorite;
      if (currentMovieIsFavorite === true) {
        dispatch({ type: "addFavorite", isFavorite: false, id: movie_id });
        await addToFavorites(authenticationData.session_id, movie_id, "delete");
      } else {
        dispatch({ type: "addFavorite", isFavorite: true, id: movie_id });
        await addToFavorites(authenticationData.session_id, movie_id, "add");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box component="div">
      <Grid container spacing={2}>
        {moviesData.sortedMovies.results.map((movie) => (
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
                  <IconButton aria-label="favorite" onClick={() => handleAddToFavorites(movie.id.toString())}>
                    {movie.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
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
