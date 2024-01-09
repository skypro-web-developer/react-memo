import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    isActiveEasyMode: false,
    errors: 0,
  },
  reducers: {
    setIsActiveEasyMode(state) {
      state.isActiveEasyMode = !state.isActiveEasyMode;
    },
    updateErrors(state) {
      state.errors = state.errors + 1;
    },
    removeErrors(state) {
      state.errors = 0;
    },
  },
});

export const { setIsActiveEasyMode, updateErrors, removeErrors } = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
