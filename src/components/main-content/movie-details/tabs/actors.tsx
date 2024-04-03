import { getMovieCredits } from "@/api/movie-data";
import { TabPanel } from "@mui/lab";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";

type ActorsTab = {
  id: number;
};

const ActorsTab = ({ id }: ActorsTab) => {
  const [cast, setCast] = useState<CastProps[]>([]);

  useEffect(() => {
    async function getCredentials() {
      const data = await getMovieCredits(id);

      const { cast } = data;
      setCast(cast);
    }
    getCredentials();
  }, [id, setCast]);

  return (
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
  );
};

export default ActorsTab;
