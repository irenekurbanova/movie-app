import { FilterProvider } from "@/contexts/filter-context/filter-context-provider.tsx";
import { getMovieDetails } from "@/api/fetchData";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "@/components/header/header";

import { ActionFunctionArgs, ParamParseKey, Params } from "react-router-dom";

const Paths = {
  movieDetails: "movies/:movieId",
} as const;

interface MovieLoaderProps extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.movieDetails>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export async function movieLoader({ params }: MovieLoaderProps) {
  if (params.movieId) {
    const movie = await getMovieDetails(params.movieId);
    return movie;
  } else return null;
}

export default function Root() {
  return (
    <FilterProvider>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Header />
        <Outlet />
      </Container>
    </FilterProvider>
  );
}
