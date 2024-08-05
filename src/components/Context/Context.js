import { createContext, useState } from "react";

export const EasyModeContext = createContext();

export const GameProvider = ({ children }) => {
  const [selectedLevel, setSelectedLevel] = useState(null);

  return <EasyModeContext.Provider value={{ selectedLevel, setSelectedLevel }}>{children}</EasyModeContext.Provider>;
};
