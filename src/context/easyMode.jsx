import { createContext, useState } from "react";

export const EasyModeContext = createContext(null);
export const EasyModeProvider = ({ children }) => {
  const [easyMode, setEasyMode] = useState(false);
  const easyModeSelect = () => {
    setEasyMode(!easyMode);
    console.log(easyMode);
  };

  return (
    <EasyModeContext.Provider value={{ easyMode, setEasyMode, easyModeSelect }}>{children}</EasyModeContext.Provider>
  );
};
