import { MovieProvider } from "@/contexts/movies/movie-context-provider";
import { getMovieDetails } from "@/api/movie-data";
import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "@/components/header/header";
import { ActionFunctionArgs, ParamParseKey, Params } from "react-router-dom";
import { AuthenticationProvider } from "@/contexts/authentication/auth-context-provier";
import Modal from "@/components/UI/modal/modal";
import { useState } from "react";
import AuthenticationStepper from "@/auth/auth-stepper";
import { FiltersProvider } from "@/contexts/filters/filter-context-provider";

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
  const [open, setOpen] = useState(false);

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  return (
    <AuthenticationProvider>
      <FiltersProvider>
        <MovieProvider>
          <Container maxWidth="xl">
            <Box display="flex" flexDirection="column" gap="16px">
              <Modal open={open} close={closeModal}>
                <AuthenticationStepper closeModal={closeModal} />
              </Modal>
              <Header openModal={openModal} />
              <Outlet />
            </Box>
          </Container>
        </MovieProvider>
      </FiltersProvider>
    </AuthenticationProvider>
  );
}
