import { createContext, useContext, useState } from "react";

export const GameContext = createContext(null);
export const useGameContext=()=>{
    return useContext(GameContext)
}

// const getUserFromLocalStorage = () => {
//   return JSON.parse(localStorage.getItem("user"));
// };
export const GameProvider = ({ children }) => {
    const[lives,setLives]=useState(3)
  const [isEasyMode, setIsEasyMode] = useState(false);

  return <GameContext.Provider value={{ isEasyMode, setIsEasyMode,lives,setLives }}>{children}</GameContext.Provider>;
};
