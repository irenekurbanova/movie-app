import { Box, AppBar, Typography, IconButton, Toolbar, Grid } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import LocalMoviesOutlinedIcon from "@mui/icons-material/LocalMoviesOutlined";
import Search from "./search";

type HeaderProps = {
  openModal: () => void;
};

const Header = ({ openModal }: HeaderProps) => {
  return (
    <Box sx={{ minWidth: "100%", display: "flex" }}>
      <AppBar position="static">
        <Toolbar>
          <Grid container rowSpacing={1}>
            <Grid item xs={6} sm={6} md={3} lg={3} alignContent="center">
              <Typography
                variant="h5"
                component="div"
                fontWeight={600}
                sx={{ textTransform: "uppercase", display: "flex", alignItems: "center", gap: 1 }}
              >
                <LocalMoviesOutlinedIcon />
                <Link to="/" className="no-underline text-inherit">
                  Фильмы
                </Link>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              order={{ xs: 3, sm: 3, md: 2, lg: 2 }}
              display="flex"
              justifyContent="space-between"
            >
              <Search />
            </Grid>
            <Grid
              item
              xs="auto"
              sm="auto"
              md="auto"
              lg="auto"
              order={{ xs: 2, sm: 2, md: 3, lg: 3 }}
              sx={{ marginLeft: "auto" }}
            >
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
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
