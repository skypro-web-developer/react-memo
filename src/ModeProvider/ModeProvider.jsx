import { createContext, useState } from "react";

export const ModeContext = createContext(null);

export function ModeProvider({ children }) {
  const [attempt, setAttempt] = useState(3);
  const [addMode, setAddMode] = useState(false);
  return <ModeContext.Provider value={{ attempt, setAttempt, addMode, setAddMode }}>{children}</ModeContext.Provider>;
}
