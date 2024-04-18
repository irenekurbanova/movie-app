import { Grid } from "@mui/material";
import MovieCard from "./movie-card";
import { MovieDataProps } from "@/store/store-types";

type MoviesListProps = {
  openAlert: () => void;
  data: MovieDataProps["movieList"]["results"];
};

const MoviesList = ({ data, openAlert }: MoviesListProps) => {
  return (
    <>
      {data.map((movie) => (
        <Grid item xs={12} sm={4} md={4} lg={4} key={movie.id} flexBasis={"100%"} display={"flex"}>
          <MovieCard
            id={movie.id}
            backdrop_path={movie.backdrop_path}
            title={movie.title}
            vote_average={movie.vote_average}
            onOpen={openAlert}
          />
        </Grid>
      ))}
    </>
  );
};

export default MoviesList;
