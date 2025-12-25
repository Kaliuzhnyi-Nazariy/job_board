export interface ISignUp {
  role: "employer" | "candidate";
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type ISignIn = Pick<ISignUp, "email" | "password">;

export interface IResponse {
  ok: boolean;
  payload?: { token: string };
  code?: number;
  message?: string;
}
