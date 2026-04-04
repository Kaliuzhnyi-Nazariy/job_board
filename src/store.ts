import { configureStore } from "@reduxjs/toolkit";
// import { authReducer } from "../features/auth/authSlice";
import { userReducer } from "../features/user/userSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import persistStore from "redux-persist/es/persistStore";

const authPersistConfig = {
  key: "user",
  storage,
  whitelist: ["token"],
};

const store = configureStore({
  reducer: {
    // auth: authReducer,
    user: persistReducer(authPersistConfig, userReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;

export const persistor = persistStore(store);

export type StoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
