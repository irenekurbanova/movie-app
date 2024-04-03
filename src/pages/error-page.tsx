import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";

export default function ErrorPage() {
  const error = useRouteError();

  let errorContent;

  if (isRouteErrorResponse(error)) {
    errorContent = (
      <>
        <Typography variant="h2">Oops!</Typography>
        <Typography variant="h5">{error.status}</Typography>
        <Typography variant="caption">{error.statusText}</Typography>
        {error.data?.message && <Typography variant="caption">{error.data.message}</Typography>}
      </>
    );
  } else if (error instanceof Error) {
    errorContent = (
      <>
        <Typography variant="h2">Oops!</Typography>
        <Typography variant="h6">{(error.message && error.message) || "Something went wrong..."}</Typography>
      </>
    );
  }

  return (
    <Container maxWidth="sm">
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
