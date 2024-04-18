import Filters from "@/components/filters/filter-bar";
import Movies from "@/components/movies/movies";
import { Grid } from "@mui/material";
import { useAppSelector } from "@/store/global-store";

const HomePage = () => {
  const isLoggedIn = useAppSelector((state) => state.authentication.isLoggedIn);

  return (
    <>
      {!isLoggedIn && null}
      {isLoggedIn && (
        <Grid container flex={1} minHeight="90vh" alignItems="stretch" spacing={2} overflow="auto">
          <Grid item xs={12} md={3} display="flex">
            <Filters />
          </Grid>
          <Grid item xs={12} md={9} padding={1} maxHeight="90vh" display="flex" alignItems="stretch" overflow="auto">
            <Movies />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default HomePage;
