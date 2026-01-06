import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { InitialJobState } from "./interfaces";
import { postJob } from "./jobRequest";

const initialState: InitialJobState = {
  isLoading: false,
  isError: null,
};

const handleLoading = (state: InitialJobState) => {
  state.isLoading = true;
  state.isError = null;
};

const handleRejection = (
  state: InitialJobState,
  action: PayloadAction<{ message: string } | undefined>
) => {
  state.isLoading = false;
  state.isError = action.payload?.message || "Something went wrong!";
};

const handleFulfilled = (state: InitialJobState) => {
  state.isLoading = false;
};

const JobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postJob.pending, handleLoading)
      .addCase(postJob.fulfilled, handleFulfilled)
      .addCase(postJob.rejected, handleRejection);
  },
});

export const jobReducer = JobSlice.reducer;
