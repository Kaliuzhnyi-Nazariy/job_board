import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";
import type { ISignIn, ISignUp } from "./interface";
import axios from "axios";

export const signup = createAsyncThunk<
  { ok: boolean },
  ISignUp,
  { rejectValue: { message: string } }
>("/auth/signup", async (data, { rejectWithValue }) => {
  try {
    const res = await api.post("/user/auth/signup", data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({
        message: error.response?.data?.message || "Signin failed",
      });
    }
  }
});

export const signin = createAsyncThunk<
  { ok: boolean },
  ISignIn,
  { rejectValue: { message: string } }
>("/user/auth/sigin", async (data, { rejectWithValue }) => {
  try {
    const res = await api.post("/user/auth/signin", data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({
        message: error.response?.data?.message || "Signin failed",
      });
    }
  }
});
