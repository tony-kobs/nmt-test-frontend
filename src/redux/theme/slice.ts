import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Theme = "light" | "dark";

type ThemeState = {
  value: Theme;
};

const initialState: ThemeState = { value: "light" };

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.value = action.payload;
    },
    toggleTheme(state) {
      state.value = state.value === "dark" ? "light" : "dark";
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
