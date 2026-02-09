import { createAsyncThunk } from "@reduxjs/toolkit";
import { type ChangePasswordState, type IUser } from "./interfaces";
import api from "../api/api";
import axios from "axios";

export const getMe = createAsyncThunk<
  IUser,
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

export const changePassword = createAsyncThunk<
  void,
  ChangePasswordState,
  { rejectValue: { message: string } }
>("/user/change-password", async (data, { rejectWithValue }) => {
  try {
    const res = await api.patch("/user/change-password", data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({
        message: error.response?.data?.message || "Signup failed",
      });
    }
  }
});

export const deleteAccount = createAsyncThunk<
  void,
  void,
  { rejectValue: { message: string } }
>("/user/delete", async (_, { rejectWithValue }) => {
  try {
    const res = await api.delete("/user/delete");
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({
        message: error.response?.data?.message || "Signup failed",
      });
    }
  }
});
