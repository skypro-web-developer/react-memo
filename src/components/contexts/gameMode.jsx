import { createContext, useState } from "react";

export const GameModeContext = createContext(null);

export const GameModeProvider = ({ children }) => {
  const [isSimpleMode, setIsSimpleMode] = useState(false);

  return <GameModeContext.Provider value={{ isSimpleMode, setIsSimpleMode }}>{children}</GameModeContext.Provider>;
};
