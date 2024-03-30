import { getMovieCredits } from "@/api/movie-data";
import { TabPanel } from "@mui/lab";
import { List, ListItem, ListItemText, Avatar, ListItemAvatar } from "@mui/material";
import { useEffect, useState } from "react";

type MovieCreditsProps = {
  id: number;
};

type CastProps = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

type CrewProps = {
  adult: boolean;
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
};

const MovieCredits = ({ id }: MovieCreditsProps) => {
  const [cast, setCast] = useState<CastProps[]>([]);
  const [crew, setCrew] = useState<CrewProps[]>([]);

  useEffect(() => {
    async function getCredentials() {
      const data = await getMovieCredits(id);

      const { cast, crew } = data;
      setCast(cast);
      setCrew(crew);
    }
    getCredentials();
  }, [id, setCast, setCrew]);

  return (
    <>
      <TabPanel value="2" sx={{ p: 0 }}>
        <List>
          {cast.map((actor) => {
            return (
              <ListItem key={actor.id} sx={{ display: "flex", gap: 1 }}>
                <ListItemAvatar>
                  <Avatar
                    alt={actor.original_name}
                    src={`https://image.tmdb.org/t/p/w500` + actor.profile_path}
                    variant="square"
                    sx={{ width: 56, height: 56 }}
                  />
                </ListItemAvatar>
                <ListItemText primary={actor.original_name} secondary={actor.character} />
              </ListItem>
            );
          })}
        </List>
      </TabPanel>
      <TabPanel value="3" sx={{ p: 0 }}>
        <List>
          {crew.map((member) => {
            return (
              <ListItem key={member.credit_id} sx={{ display: "flex", gap: 1 }}>
                <ListItemAvatar>
                  <Avatar
                    alt={member.original_name}
                    src={`https://image.tmdb.org/t/p/w500` + member.profile_path}
                    variant="square"
                    sx={{ width: 56, height: 56 }}
                  />
                </ListItemAvatar>
                <ListItemText primary={member.original_name} secondary={member.job} />
              </ListItem>
            );
          })}
        </List>
      </TabPanel>
    </>
  );
};

export default MovieCredits;
