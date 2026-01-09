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
  payload?: { token: string } | { data: string | ("employer" | "candidate") };
  code?: number;
  message?: string;
}

export interface ISignInResponse extends IResponse {
  data: "employer" | "candidate";
}

export interface ResetPassword {
  password: string;
  confirmPassword: string;
  token: string;
}
