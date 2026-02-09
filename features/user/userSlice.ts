import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser, RejectValue, UserInitialState } from "./interfaces";
import { changePassword, deleteAccount, getMe } from "./userRequest";

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
  reducers: {
    logoutUser: (state: UserInitialState) => {
      state.user = null;
      state.initialized = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMe.pending, handlePending)
      .addCase(
        getMe.fulfilled,
        (state: UserInitialState, action: PayloadAction<{ user: IUser }>) => {
          state.user = action.payload.user;
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
      .addCase(deleteAccount.rejected, handleRejected);
  },
});

export const { logoutUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
