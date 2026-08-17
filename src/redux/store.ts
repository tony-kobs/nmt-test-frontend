import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { STORAGE_KEYS } from "@/constants";
import { resultsReducer } from "@/redux/results/slice";
import { sessionReducer } from "@/redux/session/slice";
import { themeReducer } from "@/redux/theme/slice";

const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: string) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  },
});

const storage = typeof window === "undefined" ? createNoopStorage() : createWebStorage("local");

const rootReducer = combineReducers({
  theme: themeReducer,
  session: sessionReducer,
  results: resultsReducer,
});

const persistedReducer = persistReducer(
  {
    key: STORAGE_KEYS.persist,
    storage,
    whitelist: ["theme", "session", "results"],
  },
  rootReducer,
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
