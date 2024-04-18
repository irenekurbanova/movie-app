import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthDataProps } from "./store-types";
import { getAccountID } from "@/api/authentication";
import Cookies from "js-cookie";

const initialState: AuthDataProps = {
  email: "",
  isLoggedIn: false,
  token: "",
  session_id: "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setSessionId(state, action: PayloadAction<string>) {
      state.session_id = action.payload;
    },
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAccountID.fulfilled, (state, action) => {
      state.session_id = action.payload;
      state.isLoggedIn = true;
    });
  },
});

export const fetchAccountID = createAsyncThunk("authentication/getAccountID", async () => {
  try {
    const account = await getAccountID();
    Cookies.set("accountID", account.id);
    return account.id;
  } catch (error) {
    console.error(error);
  }
});

export const { setEmail, setToken, setSessionId, setIsLoggedIn } = authSlice.actions;

export { authSlice };
