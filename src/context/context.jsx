import { createContext, useState } from "react";

export const EasyModeContext = createContext(null);

export const EasyModeProvider = ({ children }) => {
  const [easy, setEasy] = useState(false);
  return <EasyModeContext.Provider value={{ easy, setEasy }}>{children}</EasyModeContext.Provider>;
};
