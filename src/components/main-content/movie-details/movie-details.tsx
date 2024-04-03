import { Box, Card, CardMedia, Tab, Grid } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import CardTitle from "./title";
import ActorsTab from "./tabs/actors";
import CrewTab from "./tabs/crew";
import OverviewTab from "./tabs/overview";
import UserAlert from "@/components/UI/alert/alert";

export default function MovieDetails() {
  const movie = useLoaderData() as MovieProps;

  const [value, setValue] = useState("1");
  const [open, setOpen] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Card>
      <Grid container maxHeight="89vh">
        <Grid item md={6}>
          <CardMedia
            component="img"
            sx={{ padding: 0 }}
            image={`https://image.tmdb.org/t/p/original` + movie.poster_path}
            alt={movie.title}
          />
        </Grid>
        <Grid item md={6} padding={2} display="flex" flexDirection="column" gap={2} maxHeight="89vh">
          <CardTitle
            title={movie.title}
            release_date={movie.release_date}
            id={movie.id}
            tagline={movie.tagline}
            onAlert={handleOpen}
          />
          <TabContext value={value}>
            <Box borderBottom={1} borderColor="divider">
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Обзор" value="1" />
                <Tab label="В ролях" value="2" />
                <Tab label="Съемочная группа" value="3" />
              </TabList>
            </Box>
            <Box sx={{ overflow: "auto" }}>
              <OverviewTab
                overview={movie.overview}
                production_countries={movie.production_countries}
                production_companies={movie.production_companies}
                release_date={movie.release_date}
                genres={movie.genres}
                budget={movie.budget}
                revenue={movie.revenue}
                runtime={movie.runtime}
              />
              <CrewTab id={movie.id} />
              <ActorsTab id={movie.id} />
            </Box>
          </TabContext>
        </Grid>
      </Grid>
      <UserAlert
        open={open}
        onClose={handleClose}
        title={"Ошибка"}
        message={"Фильм не добавлен в избранное. Проверьте соединение и попробуйте еще раз."}
      />
    </Card>
  );
}
