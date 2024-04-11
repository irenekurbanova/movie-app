import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { authSlice } from "./auth-slice";
import { filtersSlice } from "./filter-slice";
import { moviesSlice } from "./movie-slice";
import { errorSlice } from "./error-slice";

export const store = configureStore({
  reducer: {
    authentication: authSlice.reducer,
    filters: filtersSlice.reducer,
    movies: moviesSlice.reducer,
    error: errorSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
