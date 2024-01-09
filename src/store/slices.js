import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    isActiveGameMode: false,
  },
  reducers: {
    setIsActiveGameMode(state) {
      state.isActiveGameMode = !state.isActiveGameMode;
      console.log(state.isActiveGameMode);
    },
  },
});

export const { setIsActiveGameMode } = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
