import Filters from "@/components/aside-filters/filter-bar";
import Movies from "@/components/main-content/movies";
import Cookies from "js-cookie";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/global-store";
import { setToken, setIsLoggedIn, setSessionId } from "@/store/auth-slice";

const HomePage = function HomePage() {
  const isLoggedIn = useAppSelector((state) => state.authentication.isLoggedIn);
  const dispatch = useAppDispatch();
  const token = Cookies.get("token");
  const accountID = Cookies.get("accountID");

  useEffect(() => {
    function handleLogIn() {
      if (token?.length && accountID?.length) {
        dispatch(setToken(token));
        dispatch(setIsLoggedIn(true));
        dispatch(setSessionId(accountID));
      }
    }
    handleLogIn();
  }, [dispatch, token, accountID]);

  return (
    <>
      {!isLoggedIn && null}
      {isLoggedIn && (
        <Grid container flex={1} minHeight="90vh" alignItems="stretch" spacing={2} overflow="auto">
          <Grid item xs={12} md={3} display="flex">
            <Filters />
          </Grid>
          <Grid item xs={12} md={9} padding={1} maxHeight="90vh" display="flex" alignItems="stretch" overflow="auto">
            <Movies />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default HomePage;
