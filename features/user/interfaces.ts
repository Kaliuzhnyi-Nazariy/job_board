export interface IUser {
  role: string;
  username: string;
  fullname: string;
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
