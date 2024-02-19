import { createContext, useState } from "react";

export const GameContext = createContext();
export const GameProvider = ({ children }) => {
  const [easyMode, setEasyMode] = useState(true);

  return <GameContext.Provider value={{ easyMode, setEasyMode }}>{children}</GameContext.Provider>;
};
