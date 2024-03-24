import { Box, Grid, Stack, Card, CardMedia, CardContent, CardActions, IconButton, Typography } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useFiltersContext } from "@/contexts/filter-context/filter-context";
import { Link } from "react-router-dom";

const Movies = () => {
  const filteredData = useFiltersContext();

  return (
    <Box component="div" maxHeight={"89vh"}>
      <Grid container spacing={2}>
        {filteredData.sortedMovies.results.map((movie) => (
          <Grid item xs={4} key={movie.id}>
            <Link to={`movies/${movie.id}`} className="no-underline">
              <Card className="flex flex-col transition-all ease-in-out delay-150  hover:scale-110 duration-300">
                <CardMedia
                  component="img"
                  height="200"
                  image={`https://image.tmdb.org/t/p/w400` + movie.backdrop_path}
                  alt={movie.title}
                />
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
                    <IconButton aria-label="rate">
                      <StarBorderIcon />
                    </IconButton>
                  </CardActions>
                </Stack>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Movies;
