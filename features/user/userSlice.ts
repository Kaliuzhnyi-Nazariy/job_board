import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser, RejectValue, UserInitialState } from "./interfaces";
import { getMe } from "./userRequest";

const initialState: UserInitialState = {
  user: null,
  isLoading: false,
  initialized: false,
  isError: null,
};

const handlePending = (state: UserInitialState) => {
  // console.log("start fetching user data");
  state.isError = null;
  state.isLoading = false;
};

const handleRejected = (
  state: UserInitialState,
  action: PayloadAction<RejectValue | undefined>
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
    builder.addCase(getMe.pending, handlePending);
    builder.addCase(
      getMe.fulfilled,
      (state: UserInitialState, action: PayloadAction<{ user: IUser }>) => {
        state.isLoading = false;
        state.initialized = true;
        state.user = action.payload.user;
      }
    );
    builder.addCase(getMe.rejected, handleRejected);
  },
});

export const userReducer = userSlice.reducer;
