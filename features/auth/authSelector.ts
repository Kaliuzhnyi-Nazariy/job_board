import { type StoreState } from "../../src/store";

export const authLoading = (state: StoreState) => state.auth.isLoading;
