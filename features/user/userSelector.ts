import { type StoreState } from "../../src/store";

export const userRole = (state: StoreState) => state.user.user?.role;
export const userLoading = (state: StoreState) => state.user.isLoading;
export const userInitialized = (state: StoreState) => state.user.initialized;
export const userError = (state: StoreState) => state.user.isError;
