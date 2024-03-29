import { Box, AppBar, Typography, IconButton, Toolbar } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import LocalMoviesOutlinedIcon from "@mui/icons-material/LocalMoviesOutlined";

type HeaderProps = {
  openModal: () => void;
};

const Header = ({ openModal }: HeaderProps) => {
  return (
    <Box sx={{ minWidth: "100%", display: "flex" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            fontWeight={600}
            sx={{ textTransform: "uppercase", flexGrow: 1, display: "flex", gap: 1, alignItems: "center" }}
          >
            <LocalMoviesOutlinedIcon />
            <Link to="/" className="no-underline text-inherit">
              Фильмы
            </Link>
          </Typography>
          <IconButton
            edge="end"
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            onClick={openModal}
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
