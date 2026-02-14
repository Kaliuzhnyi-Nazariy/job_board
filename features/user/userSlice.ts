import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  IServiceSigninResponse,
  IUser,
  RejectValue,
  UserInitialState,
} from "./interfaces";
import { changePassword, deleteAccount, getMe } from "./userRequest";
import { logout, signin, signup } from "../auth/authRequest";

const initialState: UserInitialState = {
  user: null,
  isLoading: false,
  initialized: false,
  isError: null,
};

const handlePending = (state: UserInitialState) => {
  // console.log("start fetching user data");
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
        (state: UserInitialState, action: PayloadAction<IUser>) => {
          console.log(action.payload);
          state.isLoading = false;
          state.initialized = true;
          state.user = action.payload;
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
        },
      )
      .addCase(signin.rejected, handleRejected)

      .addCase(logout.pending, handlePending)
      .addCase(logout.fulfilled, (state: UserInitialState) => {
        state.user = null;
        state.isLoading = false;
      })
      .addCase(logout.rejected, handleRejected);
  },
});

export const userReducer = userSlice.reducer;
