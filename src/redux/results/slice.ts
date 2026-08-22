import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { HISTORY_LIMIT } from "@/constants";
import type { CategoryId } from "@/types/question";
import type { TestResult, TopicStat } from "@/types/result";

type ResultsState = {
  history: TestResult[];
  topicStats: Record<string, { correct: number; total: number }>;
  current: TestResult | null;
};

const initialState: ResultsState = {
  history: [],
  topicStats: {},
  current: null,
};

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    addResult(state, action: PayloadAction<TestResult>) {
      state.history = [action.payload, ...state.history].slice(0, HISTORY_LIMIT);
    },
    mergeTopicStats(state, action: PayloadAction<TopicStat[]>) {
      for (const item of action.payload) {
        const prev = state.topicStats[item.category] ?? { correct: 0, total: 0 };
        state.topicStats[item.category] = {
          correct: prev.correct + item.correct,
          total: prev.total + item.total,
        };
      }
    },
    setCurrentResult(state, action: PayloadAction<TestResult | null>) {
      state.current = action.payload;
    },
    clearCurrentResult(state) {
      state.current = null;
    },
    hydrateResults(
      state,
      action: PayloadAction<{
        history: TestResult[];
        topicStats: Record<CategoryId, { correct: number; total: number }>;
      }>,
    ) {
      if (state.history.length === 0) state.history = action.payload.history;
      if (Object.keys(state.topicStats).length === 0) state.topicStats = action.payload.topicStats;
    },
  },
});

export const { addResult, mergeTopicStats, setCurrentResult, clearCurrentResult, hydrateResults } =
  resultsSlice.actions;
export const resultsReducer = resultsSlice.reducer;
