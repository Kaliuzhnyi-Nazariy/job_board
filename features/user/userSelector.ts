import { type StoreState } from "../../src/store";

export const userRole = (state: StoreState) => state.user.user?.role;
export const userLoading = (state: StoreState) => state.user.isLoading;
export const userInitialized = (state: StoreState) => state.user.initialized;
export const userError = (state: StoreState) => state.user.isError;
export const username = (state: StoreState) => state.user.user?.username;
export const userFullName = (state: StoreState) => state.user.user?.full_name;
export const userId = (state: StoreState) => state.user.user?.id;
