import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    leaders: [],
    isActiveEasyMode: false,
    errors: 0,
  },
  reducers: {
    setLeaders(state, action) {
      state.leaders = action.payload.leaders;
    },
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

export const { setLeaders, setIsActiveEasyMode, updateErrors, removeErrors } = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
