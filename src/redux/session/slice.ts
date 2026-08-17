import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ActiveSession, AnswerValue } from "@/types/test";

type SessionState = {
  current: ActiveSession | null;
};

const initialState: SessionState = { current: null };

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<ActiveSession>) {
      state.current = action.payload;
    },
    updateSession(state, action: PayloadAction<ActiveSession>) {
      state.current = action.payload;
    },
    setAnswer(
      state,
      action: PayloadAction<{ questionId: string; value: AnswerValue }>,
    ) {
      if (!state.current) return;
      state.current.answers[action.payload.questionId] = action.payload.value;
    },
    setCurrentIndex(state, action: PayloadAction<number>) {
      if (!state.current) return;
      const max = state.current.questions.length - 1;
      state.current.currentIndex = Math.max(0, Math.min(max, action.payload));
    },
    toggleFlag(state, action: PayloadAction<string>) {
      if (!state.current) return;
      const id = action.payload;
      state.current.flagged = state.current.flagged.includes(id)
        ? state.current.flagged.filter((item) => item !== id)
        : [...state.current.flagged, id];
    },
    clearSession(state) {
      state.current = null;
    },
    hydrateSession(state, action: PayloadAction<ActiveSession | null>) {
      state.current = action.payload;
    },
  },
});

export const {
  setSession,
  updateSession,
  setAnswer,
  setCurrentIndex,
  toggleFlag,
  clearSession,
  hydrateSession,
} = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;
