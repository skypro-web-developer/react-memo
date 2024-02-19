import { createContext, useState } from "react";

export const GameContext = createContext();
export const GameProvider = ({ children }) => {
  const [easyMode] = useState(true);

  return <GameContext.Provider value={easyMode}>{children}</GameContext.Provider>;
};
