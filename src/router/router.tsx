import { ActionFunctionArgs, createBrowserRouter, LoaderFunction, ParamParseKey, Params } from "react-router-dom";
import { getMovieDetails } from "@/api/movie-data";
import { Root } from "@/pages/root";
import ErrorPage from "@/pages/error-page";
import HomePage from "@/pages/home-page";
import MovieDetailsPage from "@/pages/movie-details-page";
import { Paths } from "./constants";

interface MovieLoaderProps extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.movieDetails>>;
}

async function movieLoader({ params }: MovieLoaderProps) {
  try {
    if (params.movieId) {
      const movie = await getMovieDetails(params.movieId);

      if (!movie.error) {
        return movie;
      }
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "movies/:movieId",
        element: <MovieDetailsPage />,
        loader: movieLoader as LoaderFunction,
      },
    ],
  },
]);
