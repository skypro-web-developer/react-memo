import React, { useState } from "react";

export const ModeContext = React.createContext({
  changeMode: () => {},
  mode: "hard",
  level: null,
  setLevel: () => {},
});

export function ModeProvider({ children }) {
  const [mode, setMode] = useState("hard");
  const [level, setLevel] = useState(null);

  const changeMode = () => {
    setMode(prevMode => (prevMode === "hard" ? "easy" : "hard"));
  };
  return (
    <ModeContext.Provider
      value={{
        changeMode,
        mode,
        setLevel,
        level,
      }}
    >
      {children}
    </ModeContext.Provider>
  );
}
