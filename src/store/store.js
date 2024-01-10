import { configureStore } from "@reduxjs/toolkit";
import getGameSliceReducer from "./slices/game";

export default configureStore({
  reduser: {
    game: getGameSliceReducer,
  },
});
