import Filters from "@/components/aside-filters/filter-bar";
import Movies from "@/components/main-content/movies";
import { useAuthContext, useAuthDispatch } from "@/contexts/authentication/auth-context";
import Cookies from "js-cookie";
import { Grid } from "@mui/material";
import { useEffect } from "react";

const HomePage = () => {
  const authenticationData = useAuthContext();
  const dispatch = useAuthDispatch();
  const token = Cookies.get("token");
  const accountID = Cookies.get("accountID");

  useEffect(() => {
    function handleLogIn() {
      if (token?.length && accountID?.length) {
        dispatch({ type: "setToken", token: token });
        dispatch({ type: "setIsLoggedIn", isLoggedIn: true });
        dispatch({ type: "setSessionId", id: accountID });
      }
    }
    handleLogIn();
  }, [dispatch, token, accountID]);

  return (
    <>
      {!authenticationData.isLoggedIn && null}
      {authenticationData.isLoggedIn && (
        <Grid container flex={1} minHeight="90vh" alignItems="stretch" spacing={2} overflow="auto">
          <Grid item xs={12} md={3} display="flex">
            <Filters />
          </Grid>
          <Grid item xs={12} md={9} padding={3} maxHeight="90vh" display="flex" justifyContent="center" overflow="auto">
            <Movies />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default HomePage;
