import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { signin, signup } from "./authRequest";

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
      .addCase(signin.rejected, handleRejection);
  },
});

export const authReducer = authSlice.reducer;
