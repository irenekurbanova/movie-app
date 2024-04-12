import { IconButton } from "@mui/material";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addToFavorites } from "@/api/movie-data";
import { useAppDispatch, useAppSelector } from "@/store/global-store";
import { fetchFavoriteMovies } from "@/store/movie-slice";

type FavoriteButtonProps = {
  id: number;
  openAlert: () => void;
  // isFavorite: boolean;
};

const FavoriteButton = ({ id, openAlert }: FavoriteButtonProps) => {
  const session_id = useAppSelector((state) => state.authentication.session_id);
  const favoritesList = useAppSelector((state) => state.movies.favorites.results);
  const dispatch = useAppDispatch();
  const isFavorite = favoritesList.some((favorite) => favorite.id === id);
  const [favorite, setFavorite] = useState(isFavorite);

  async function addToFavoriteHandler() {
    setFavorite((favorite) => !favorite);
    try {
      if (isFavorite) {
        await addToFavorites(session_id, id.toString(), "delete");
        dispatch(fetchFavoriteMovies(session_id));
      } else {
        await addToFavorites(session_id, id.toString(), "add");
        dispatch(fetchFavoriteMovies(session_id));
      }
    } catch (error) {
      setFavorite((fav) => !fav);
      openAlert();
    }
  }

  return (
    <IconButton aria-label="favorite" onClick={addToFavoriteHandler}>
      <FavoriteIcon color={favorite ? "error" : "disabled"} />
    </IconButton>
  );
};

export default FavoriteButton;
