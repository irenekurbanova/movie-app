import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";

export default function ErrorPage() {
  const error = useRouteError();

  let errorContent;

  if (isRouteErrorResponse(error)) {
    errorContent = (
      <>
        <Typography variant="h2">Oops!</Typography>
        <Typography variant="h3">{error.status}</Typography>
        <Typography variant="h5">{error.data.message}</Typography>
      </>
    );
  } else {
    errorContent = (
      <>
        <Typography variant="h2">Oops!</Typography>
        <Typography variant="h3">Something went wrong</Typography>
      </>
    );
  }

  return (
    <Container maxWidth="md">
      <Box
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        gap="16px"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        {errorContent}
      </Box>
    </Container>
  );
}
