import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { storeReducer } from "./stores/slice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const authConfig = {
    key: "auth",
    storage,
    whitelist: ["token"],
  };

export const store = configureStore({
  reducer: {
    auth: persistReducer(authConfig, authReducer),
    stores: storeReducer
  },
  
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);