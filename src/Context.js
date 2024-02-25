import { createContext, useContext, useState } from "react";

// const initialState = {
//   isEasyMode: false,
//   level: null,
//   setLevel: () => {},
//   setIsEasyMode: () => {},
// };

export const GameContext = createContext();
export const useGameContext = () => {
  return useContext(GameContext);
};
export const GameProvider = ({ children }) => {
  const [lives, setLives] = useState(3);
  const [isEasyMode, setIsEasyMode] = useState(false);
  const [level, setLevel] = useState(null);
  return (
    <GameContext.Provider value={{ isEasyMode, setIsEasyMode, lives, setLives, level, setLevel }}>
      {children}
    </GameContext.Provider>
  );
};
