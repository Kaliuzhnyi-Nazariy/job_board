import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IJobForm, Job } from "./interfaces";
import api from "../api/api";
import axios from "axios";

export const postJob = createAsyncThunk<
  Job,
  IJobForm,
  { rejectValue: { message: string } }
>("/job/post", async (data, { rejectWithValue }) => {
  try {
    // didn't send "experience, "

    const res = await api.post("/job/post", {
      ...data,
      salary: `$${data.minSalary}-$${data.maxSalary}/${data.salaryType}`,
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({
        message: error.response?.data?.message || "Signup failed",
      });
    }
  }
});
