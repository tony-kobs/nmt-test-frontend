"use client";

import { useEffect, type ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
import { Loader } from "@/components/Loader";
import { clearLegacyStorage, readLegacyStorage, writeThemeKey } from "@/helpers/legacyStorage";
import { hydrateResults } from "@/redux/results/slice";
import { hydrateSession } from "@/redux/session/slice";
import { setTheme } from "@/redux/theme/slice";
import { persistor, store } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

function ThemeSync({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.value);
  const session = useAppSelector((state) => state.session.current);
  const history = useAppSelector((state) => state.results.history);
  const topicStats = useAppSelector((state) => state.results.topicStats);

  useEffect(() => {
    writeThemeKey(theme);
  }, [theme]);

  useEffect(() => {
    const legacy = readLegacyStorage();
    if (!legacy) return;
    if (!session && history.length === 0 && Object.keys(topicStats).length === 0) {
      if (legacy.session) dispatch(hydrateSession(legacy.session));
      dispatch(hydrateResults({ history: legacy.history, topicStats: legacy.topicStats }));
      dispatch(setTheme(legacy.theme));
    }
    clearLegacyStorage();
  }, [dispatch, history.length, session, topicStats]);

  return children;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader label="Завантаження…" />} persistor={persistor}>
        <ThemeSync>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 2500,
              style: {
                border: "1px solid var(--border)",
                borderRadius: 0,
                background: "var(--surface)",
                color: "var(--ink)",
                boxShadow: "6px 8px 0 var(--shadow)",
              },
            }}
          />
        </ThemeSync>
      </PersistGate>
    </Provider>
  );
}
