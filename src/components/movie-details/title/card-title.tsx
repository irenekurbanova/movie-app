import FavoriteButton from "@/components/buttons/favorite";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Stack, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

type CardTitleProps = {
  title: string;
  release_date: string;
  id: number;
  tagline: string;
  onAlert: () => void;
};

const CardTitle = ({ title, release_date, id, tagline, onAlert }: CardTitleProps) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" gap={1}>
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
          <Typography variant="overline" className="underline underline-offset-4 decoration-white">
            {release_date.slice(0, 4)}
          </Typography>
        </Stack>
        <FavoriteButton id={id} openAlert={onAlert} />
      </Stack>
      {tagline.length > 0 && <Typography className="text-white text-sm italic ">{tagline}</Typography>}
      <Stack>
        <Link to="/" className="self-start text-white no-underline">
          <Button className="flex align-middle gap-3 normal-case">
            <ArrowBackIcon />
            <Typography>Вернуться назад</Typography>
          </Button>
        </Link>
      </Stack>
    </Box>
  );
};

export default CardTitle;
