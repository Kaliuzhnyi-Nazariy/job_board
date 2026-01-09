import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";
import type {
  IResponse,
  ISignIn,
  ISignInResponse,
  ISignUp,
  ResetPassword,
} from "./interface";
import axios from "axios";

export const signup = createAsyncThunk<
  IResponse,
  ISignUp,
  { rejectValue: { message: string } }
>("/auth/signup", async (data, { rejectWithValue }) => {
  try {
    const res = await api.post("/user/auth/signup", data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({
        message: error.response?.data?.message || "Signup failed",
      });
    }
  }
});

export const signin = createAsyncThunk<
  // IResponse,
  ISignInResponse,
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

export const logout = createAsyncThunk<
  IResponse,
  void,
  { rejectValue: { message: string } }
>("/user/auth/logout", async (_, { rejectWithValue }) => {
  try {
    const res = await api.post("/user/auth/signout");
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({
        message: error.response?.data?.message || "Signout failed",
      });
    }
  }
});

export const forgetPassword = createAsyncThunk<
  IResponse,
  { email: string },
  { rejectValue: { message: string } }
>("/user/auth/forget-password", async (data, { rejectWithValue }) => {
  try {
    const res = await api.post("/user/auth/email-for-reset", data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({
        message: error.response?.data?.message || "Email sending failed",
      });
    }
  }
});

export const resetPassword = createAsyncThunk<
  IResponse,
  ResetPassword,
  { rejectValue: { message: string } }
>("/user/auth/reset-pasword", async (data, { rejectWithValue }) => {
  try {
    const res = await api.post("/user/auth/reset-password", data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({
        message: error.response?.data?.message || "Reset password failed",
      });
    }
  }
});
