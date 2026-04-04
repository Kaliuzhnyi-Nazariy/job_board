import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  IServiceSigninResponse,
  IUser,
  RejectValue,
  UserInitialState,
} from "./interfaces";
import {
  changePassword,
  deleteAccount,
  getMe,
  refreshUser,
} from "./userRequest";
import { logout, signin, signup } from "../auth/authRequest";
import type { ISignupResponse } from "../auth/interface";

const initialState: UserInitialState = {
  user: null,
  isLoading: false,
  initialized: false,
  isError: null,
  token: null,
};

const handlePending = (state: UserInitialState) => {
  state.isError = null;
  state.isLoading = true;
};

const handleRejected = (
  state: UserInitialState,
  action: PayloadAction<RejectValue | undefined>,
) => {
  state.isLoading = false;
  state.initialized = true;
  state.isError = action.payload?.message || "Server error!";
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMe.pending, handlePending)
      .addCase(
        getMe.fulfilled,
        (state: UserInitialState, action: PayloadAction<IUser>) => {
          state.user = action.payload;
          state.isLoading = false;
          state.initialized = true;
        },
      )
      .addCase(
        getMe.rejected,
        (
          state: UserInitialState,
          action: PayloadAction<RejectValue | undefined>,
        ) => {
          state.isLoading = false;
          state.initialized = true;
          state.isError = action.payload?.message || "Server error!";
          state.user = null;
        },
      )
      .addCase(changePassword.pending, handlePending)
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(changePassword.rejected, handleRejected)
      .addCase(deleteAccount.pending, handlePending)
      .addCase(deleteAccount.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
      })
      .addCase(deleteAccount.rejected, handleRejected)

      .addCase(signup.pending, handlePending)
      .addCase(
        signup.fulfilled,
        (state: UserInitialState, action: PayloadAction<ISignupResponse>) => {
          state.isLoading = false;
          state.initialized = true;
          state.user = action.payload.data;
          state.token = action.payload.token;
        },
      )
      .addCase(signup.rejected, handleRejected)

      .addCase(signin.pending, handlePending)
      .addCase(
        signin.fulfilled,
        (
          state: UserInitialState,
          action: PayloadAction<IServiceSigninResponse>,
        ) => {
          state.isLoading = false;
          state.initialized = true;
          state.user = action.payload.data;
          state.token = action.payload.token;
        },
      )
      .addCase(signin.rejected, handleRejected)

      .addCase(logout.pending, handlePending)
      .addCase(logout.fulfilled, (state: UserInitialState) => {
        state.user = null;
        state.isLoading = false;
        state.token = "";
      })
      .addCase(logout.rejected, handleRejected)
      .addCase(refreshUser.pending, handlePending)
      .addCase(
        refreshUser.fulfilled,
        (state: UserInitialState, action: PayloadAction<IUser>) => {
          state.user = action.payload;
          state.initialized = true;
          state.isLoading = false;
        },
      )
      .addCase(refreshUser.rejected, handleRejected);
  },
});

export const userReducer = userSlice.reducer;
