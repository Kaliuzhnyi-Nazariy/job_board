import type ForgetPassword from "../../src/pages/auth/ForgetPassword";
import api from "../api/api";
import type { ResetPassword } from "./interface";

export const forgetPassword = async (email: ForgetPassword) => {
  const res = await api.post("/user/auth/email-for-reset", email);
  return res.data;
};

export const resetPassword = async (data: ResetPassword) => {
  const res = await api.post("/user/auth/reset-password", data);
  return res.data;
};
