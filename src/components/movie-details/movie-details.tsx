import { Box, Card, CardMedia, CardContent, Tab, Typography, Stack } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import MovieCredits from "@/components/movie-details/movie-credits";

type MovieProps = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

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
        sx={{ width: 500, padding: 0 }}
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
        {movie.tagline.length > 0 && (
          <Typography variant="body2" className="text-white">
            {movie.tagline}
          </Typography>
        )}
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Обзор" value="1" />
              <Tab label="В ролях" value="2" />
              <Tab label="Съемочная группа" value="3" />
            </TabList>
          </Box>
          <Box sx={{ overflow: "auto" }}>
            <TabPanel value="1">{movie.overview}</TabPanel>
            <MovieCredits id={movie.id} />
          </Box>
        </TabContext>
      </CardContent>
    </Card>
  );
}
