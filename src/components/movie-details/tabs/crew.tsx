import { getMovieCredits } from "@/api/movie-data";
import { TabPanel } from "@mui/lab";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { useState, useEffect } from "react";
import { CrewTabProps } from "./types";

const CrewTab = ({ id }: CrewTabProps) => {
  const [crew, setCrew] = useState<CrewProps[]>([]);

  useEffect(() => {
    async function getCredentials() {
      const data = await getMovieCredits(id);

      const { crew } = data;

      setCrew(crew);
    }
    getCredentials();
  }, [id, setCrew]);

  return (
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
  );
};

export default CrewTab;
