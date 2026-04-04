import { createAsyncThunk } from "@reduxjs/toolkit";
import { type ChangePasswordState, type IUser } from "./interfaces";
import api, { clearToken, setAuthToken } from "../api/api";
import axios from "axios";
import type { StoreState } from "../../src/store";

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
    clearToken();
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({
        message: error.response?.data?.message || "Signup failed",
      });
    }
  }
});

export const refreshUser = createAsyncThunk<
  IUser,
  void,
  { rejectValue: { message: string } }
>("user/refresh", async (_, thunkAPI) => {
  const state = thunkAPI.getState() as StoreState;
  const persistedToken = state.user.token;

  if (!persistedToken) {
    return thunkAPI.rejectWithValue({ message: "Unable to fetch user" });
  }

  try {
    setAuthToken(persistedToken);
    const res = await api.get("/user/get-me");
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || "Refresh failed",
      });
    }

    return thunkAPI.rejectWithValue({
      message: "Unknown error",
    });
  }
});
