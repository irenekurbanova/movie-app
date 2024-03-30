import { IconButton } from "@mui/material";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useMoviesContext, useMoviesDispatch } from "@/contexts/movies/movie-context";
import { addToFavorites, getFavoriteMovieList } from "@/api/movie-data";
import { useAuthContext } from "@/contexts/authentication/auth-context";

type FavoriteButtonProps = {
  isFavorite: boolean;
  id: string;
};

const FavoriteButton = ({ isFavorite, id }: FavoriteButtonProps) => {
  const movieData = useMoviesContext();
  const dispatch = useMoviesDispatch();
  const authenticationData = useAuthContext();
  const [favorite, setFavorite] = useState(isFavorite);

  async function addToFavoriteHandler() {
    setFavorite((favorite) => !favorite);
    try {
      const currentMovieIsFavorite = movieData.favorites.results.some((favorite) => favorite.id.toString() === id);
      if (currentMovieIsFavorite) {
        await addToFavorites(authenticationData.session_id, id, "delete");
        const favoriteMoviesList = await getFavoriteMovieList(authenticationData.session_id);
        dispatch({ type: "setFavoritesList", favorites: favoriteMoviesList });
      } else {
        await addToFavorites(authenticationData.session_id, id, "add");
        const favoriteMoviesList = await getFavoriteMovieList(authenticationData.session_id);
        dispatch({ type: "setFavoritesList", favorites: favoriteMoviesList });
      }
    } catch (error) {
      console.error(error);
      setFavorite((favorite) => !favorite);
    }
  }

  return (
    <IconButton aria-label="favorite" onClick={addToFavoriteHandler}>
      <FavoriteIcon color={favorite ? "error" : "disabled"} />
    </IconButton>
  );
};

export default FavoriteButton;
