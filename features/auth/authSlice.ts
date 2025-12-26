import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  forgetPassword,
  logout,
  resetPassword,
  signin,
  signup,
} from "./authRequest";

export interface AuthReducerState {
  isLoading: boolean;
  isError: null | string;
}

const initialState: AuthReducerState = {
  isLoading: false,
  isError: null,
};

const handlePending = (state: AuthReducerState) => {
  state.isLoading = true;
  state.isError = null;
};

const handleRejection = (
  state: AuthReducerState,
  action: PayloadAction<{ message: string } | undefined>
) => {
  state.isLoading = false;
  state.isError = action.payload?.message || "Auth error!";
};

const handleFulfilled = (state: AuthReducerState) => {
  state.isLoading = false;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(signup.pending, handlePending)
      .addCase(signup.fulfilled, handleFulfilled)
      .addCase(signup.rejected, handleRejection)

      .addCase(signin.pending, handlePending)
      .addCase(signin.fulfilled, handleFulfilled)
      .addCase(signin.rejected, handleRejection)

      .addCase(logout.pending, handlePending)
      .addCase(logout.fulfilled, handleFulfilled)
      .addCase(logout.rejected, handleRejection)

      .addCase(forgetPassword.pending, handlePending)
      .addCase(forgetPassword.fulfilled, handleFulfilled)
      .addCase(forgetPassword.rejected, handleRejection)

      .addCase(resetPassword.pending, handlePending)
      .addCase(resetPassword.fulfilled, handleFulfilled)
      .addCase(resetPassword.rejected, handleRejection);
  },
});

export const authReducer = authSlice.reducer;
