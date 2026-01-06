import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/authSlice";
import { userReducer } from "../features/user/userSlice";
import { jobReducer } from "../features/job/jobSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    job: jobReducer,
  },
});

export default store;

export type StoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
