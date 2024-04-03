import { Box, Card, CardMedia, CardContent, Tab, Typography, Stack, Button } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Link, useLoaderData } from "react-router-dom";
import { useState } from "react";
import MovieCredits from "@/components/main-content/movie-details/movie-credits";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function MovieDetails() {
  const movie = useLoaderData() as MovieProps;

  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Card sx={{ display: "flex", justifyContent: "stretch", maxHeight: "89vh" }}>
      <CardMedia
        component="img"
        width={500}
        sx={{ padding: 0 }}
        image={`https://image.tmdb.org/t/p/original` + movie.poster_path}
        alt={movie.title}
      />
      <CardContent sx={{ flex: 1, padding: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h6" fontWeight={600}>
            {movie.title}
          </Typography>
          <Typography variant="overline" className="underline underline-offset-4 decoration-white">
            {movie.release_date.slice(0, 4)}
          </Typography>
        </Stack>
        <Link to="/" className=" text-white no-underline">
          <Button className="flex align-middle gap-3 normal-case">
            <ArrowBackIcon />
            <Typography>Вернуться назад</Typography>
          </Button>
        </Link>
        {movie.tagline.length > 0 && <Typography className="text-white text-sm italic ">{movie.tagline}</Typography>}
        <TabContext value={value}>
          <Box borderBottom={1} borderColor="divider">
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Обзор" value="1" />
              <Tab label="В ролях" value="2" />
              <Tab label="Съемочная группа" value="3" />
            </TabList>
          </Box>
          <Box sx={{ overflow: "auto" }}>
            <TabPanel value="1" sx={{ p: 0, display: "flex", flexDirection: "column", flexBasis: 1, gap: 2 }}>
              <Typography>{movie.overview}</Typography>
              <Stack display="flex" maxWidth="50%" gap={3}>
                <Box display="flex" alignItems="center">
                  <Typography className="text-sm text-zinc-200" width={"20%"}>
                    Страна
                  </Typography>
                  <Typography className="text-sm">{movie.production_countries[0].name}</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <Typography className="text-sm text-zinc-200" width={"20%"}>
                    Жанр
                  </Typography>
                  <Typography className="text-sm">{movie.genres.map((genre) => genre.name + "," + " ")}</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <Typography className="text-sm text-zinc-200" width={"20%"}>
                    Сборы
                  </Typography>
                  <Typography className="text-sm">{movie.revenue}$</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <Typography className="text-sm text-zinc-200" width={"20%"}>
                    Возраст
                  </Typography>
                  <Typography className="text-sm">{movie.adult ? "18+" : "6+"}</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <Typography className="text-sm text-zinc-200" width={"20%"}>
                    Время
                  </Typography>
                  <Typography className="text-sm">{movie.runtime} минут</Typography>
                </Box>
              </Stack>
            </TabPanel>
            <MovieCredits id={movie.id} />
          </Box>
        </TabContext>
      </CardContent>
    </Card>
  );
}
