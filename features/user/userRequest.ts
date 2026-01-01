import { createAsyncThunk } from "@reduxjs/toolkit";
import { type IUser } from "./interfaces";
import api from "../api/api";
import axios from "axios";

export const getMe = createAsyncThunk<
  { user: IUser },
  void,
  { rejectValue: { message: string } }
>("/user/getMe", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/user/get-me");
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({
        message: error.response?.data?.message || "Signup failed",
      });
    }
  }
});
