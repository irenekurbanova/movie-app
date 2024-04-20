import { createSlice } from "@reduxjs/toolkit";
import { ErrorData } from "./store-types";

const initialState: ErrorData = {
  message: "some message",
  code: null,
  showError: true,
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    showError(state) {
      state.showError = !state.showError;
    },
    setErrorMessage(state, action) {
      state.message = action.payload;
    },
    setErrorCode(state, action) {
      state.code = action.payload;
    },
  },
});

export const { showError, setErrorCode, setErrorMessage } = errorSlice.actions;
