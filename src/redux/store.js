import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { storeReducer } from "./stores/slice";
import { medicinesReducer } from "./medicine/slice";
import { reviewsReducer } from "./reviews/slice";
import { CartReducer } from "./cart/slice";
import { setupAxiosInterceptors } from '../redux/services/authServices';

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
    whitelist: ["token", "refreshToken"],
  };

export const store = configureStore({
  reducer: {
    auth: persistReducer(authConfig, authReducer),
    stores: storeReducer,
    medicines: medicinesReducer,
    reviews: reviewsReducer,
    cart: CartReducer
  },
  
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

setupAxiosInterceptors(store);

export const persistor = persistStore(store);