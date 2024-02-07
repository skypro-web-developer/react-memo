import { createSlice } from "@reduxjs/toolkit";

const gameSlices = createSlice({
  name: "game",
  initialState: {
    isEasyMode: false,
    attempts: 3,
  },
  reducers: {
    setEasyMode(state) {
      state.isEasyMode = !state.isEasyMode;
    },
    updateAttempts(state) {
      state.attempts = state.attempts - 1;
    },
    removeAttempts(state) {
      state.attempts = 3;
    },
  },
});

export const { setEasyMode, updateAttempts, removeAttempts } = gameSlices.actions;
export const gameReducer = gameSlices.reducer;
