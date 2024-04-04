import { Box, AppBar, Typography, IconButton, Toolbar, Grid } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import LocalMoviesOutlinedIcon from "@mui/icons-material/LocalMoviesOutlined";
import Search from "./search";
import { useAuthContext } from "@/contexts/authentication/auth-context";

type HeaderProps = {
  openModal: () => void;
};

const Header = ({ openModal }: HeaderProps) => {
  const { pathname } = useLocation();
  const isAutenticated = useAuthContext();

  return (
    <Box minWidth="100%" display="flex">
      <AppBar position="static">
        <Toolbar>
          <Grid container rowSpacing={1} alignItems="center">
            <Grid item xs={6} sm={6} md={3} lg={3}>
              <Typography
                variant="h5"
                component="div"
                fontWeight={600}
                textTransform="uppercase"
                display="flex"
                alignItems="center"
                gap={1}
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
              {isAutenticated.isLoggedIn && !pathname.includes("movies") && <Search />}
            </Grid>
            <Grid item xs="auto" sm="auto" md="auto" lg="auto" order={{ xs: 2, sm: 2, md: 3, lg: 3 }} marginLeft="auto">
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
