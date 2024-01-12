import { createSlice } from "@reduxjs/toolkit";
const getGameSlice = createSlice({
  name: "game",

  initialState: {
    gameRegime: false,
    level: 0,
  },
  reducers: {
    gameModeReducer(state) {
      state.gameRegime ? (state.gameRegime = false) : (state.gameRegime = true);
    },
    currentLevel(state, action) {
      console.log(action.payload);
      state.level = action.payload;
    },
  },
});

export const { gameModeReducer, currentLevel } = getGameSlice.actions;
export default getGameSlice.reducer;
