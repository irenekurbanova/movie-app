import Filters from "@/components/aside-filters/filter-bar";
import Movies from "@/components/main-content/movies";
import { Grid } from "@mui/material";

const HomePage = () => {
  return (
    <Grid container sx={{ flex: 1 }} alignItems="stretch" spacing={2}>
      <Grid item xs={12} md={3} display="flex">
        <Filters />
      </Grid>
      <Grid item xs={12} md={9} padding={1} display="flex" overflow="auto">
        <Movies />
      </Grid>
    </Grid>
  );
};

export default HomePage;
