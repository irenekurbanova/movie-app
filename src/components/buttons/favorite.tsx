// import { IconButton } from "@mui/material";
// import { useEffect } from "react";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import { useMoviesContext } from "@/contexts/movies/movie-context";

// type FavoriteButtonProps = {
//   movieID: string;
// };

// const FavoriteButton = ({ movieID }: FavoriteButtonProps) => {
//   const moviesData = useMoviesContext();

//   useEffect(() => {
//     async function updateFavorites(movieID) {}
//   });

//   async function handleAddToFavorites(movie_id: string) {
//     try {
//       if (moviesData.favorites.find((fav) => fav.id.toString() === movie_id)) {
//         await addToFavorites(authenticationData.session_id, movie_id, "delete");
//         dispatch({ type: "addFavorite", isFavorite: false, id: movie_id });
//       } else {
//         await addToFavorites(authenticationData.session_id, movie_id, "add");
//         dispatch({ type: "addFavorite", isFavorite: true, id: movie_id });
//       }
//       const favMovies = await getFavoriteMovieList(authenticationData.session_id);
//       dispatch({ type: "setFavoritesList", favorites: favMovies.results });
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   return (
//     <IconButton aria-label="favorite" onClick={() => handleAddToFavorites(movie.id.toString())}>
//       {movie.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
//     </IconButton>
//   );
// };

// export default FavoriteButton;
