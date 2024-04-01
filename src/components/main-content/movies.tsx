import { Box, Grid, Stack, Card, CardMedia, CardContent, CardActions, Typography } from "@mui/material";
import { useMoviesContext, useMoviesDispatch } from "@/contexts/movies/movie-context";
import { useFiltersContext, useFiltersDispatch } from "@/contexts/filters/filter-context";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getFavoriteMovieList, getMovieBySearch, getSortedMovies } from "@/api/movie-data";
import { useAuthContext } from "@/contexts/authentication/auth-context";
import FavoriteButton from "../buttons/favorite";

const Movies = () => {
  const filtersData = useFiltersContext();
  const dispatchFilters = useFiltersDispatch();
  const moviesData = useMoviesContext();
  const authenticationData = useAuthContext();
  const dispatchMovies = useMoviesDispatch();

  useEffect(() => {
    async function loadInitialMovieList() {
      try {
        const favoriteMovieList = await getFavoriteMovieList(authenticationData.session_id);
        dispatchMovies({ type: "setFavoritesList", favorites: favoriteMovieList });
        dispatchFilters({ type: "setActiveFilter", filter: "select", active: true });
        const popularMovieList = await getSortedMovies(filtersData.sortBy, moviesData.page);
        dispatchMovies({ type: "setMovieList", data: popularMovieList });
      } catch (error) {
        console.error(error);
      }
    }
    loadInitialMovieList();
  }, []);

  useEffect(() => {
    async function loadMovies() {
      let data;
      try {
        const favoriteMovieList = await getFavoriteMovieList(authenticationData.session_id);
        dispatchMovies({ type: "setFavoritesList", favorites: favoriteMovieList });
        if (filtersData.activeFilter.select === true) {
          data = await getSortedMovies(filtersData.sortBy, moviesData.page);
          dispatchMovies({ type: "setMovieList", data: data });
        }
        if (filtersData.activeFilter.search == true) {
          data = await getMovieBySearch(filtersData.query, moviesData.page);
          dispatchMovies({ type: "setMovieList", data: data });
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadMovies();
  }, [
    authenticationData.session_id,
    dispatchMovies,
    filtersData.activeFilter.search,
    filtersData.activeFilter.select,
    filtersData.query,
    filtersData.sortBy,
    moviesData.page,
  ]);

  return (
    <Box component="div">
      <Grid container spacing={2}>
        {moviesData.movieList.results.map((movie) => (
          <Grid item xs={4} key={movie.id}>
            <Card className="flex flex-col transition-all ease-in-out delay-150  hover:scale-110 duration-300">
              <Link to={`movies/${movie.id}`} className="no-underline">
                <CardMedia
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
