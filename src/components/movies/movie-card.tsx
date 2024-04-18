import { Card, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteButton from "../buttons/favorite";

type MovieCardProps = {
  id: number;
  backdrop_path: string;
  title: string;
  vote_average: number;
  onOpen: () => void;
};

const MovieCard = ({ id, backdrop_path, title, vote_average, onOpen }: MovieCardProps) => {
  return (
    <Card className="grid transition-all ease-in-out delay-150  hover:scale-105 duration-300">
      <Link to={`movies/${id}`} className="no-underline">
        <CardMedia
          width="500"
          height="200"
          component="img"
          image={`https://image.tmdb.org/t/p/w500` + backdrop_path}
          alt={title}
        />
      </Link>
      <Stack direction="row" justifyContent="space-between">
        <CardContent sx={{ padding: "8px" }}>
          <Typography variant="subtitle2" color="text.primary" fontWeight={600}>
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Рейтинг {vote_average.toFixed(1)}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <FavoriteButton openAlert={onOpen} id={id} key={id} />
        </CardActions>
      </Stack>
    </Card>
  );
};

export default MovieCard;
