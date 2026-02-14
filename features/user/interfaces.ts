export interface IUser {
  id: string;
  role: string;
  username: string;
  full_name: string;
  email: string;
}

export interface UserInitialState {
  user: IUser | null;
  isLoading: boolean;
  initialized: boolean;
  isError: string | null;
}

export interface RejectValue {
  message: string;
}

export interface ChangePasswordState {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface IServiceSigninResponse {
  data: IUser;
  token: string;
  role: "employer" | "candidate";
}
