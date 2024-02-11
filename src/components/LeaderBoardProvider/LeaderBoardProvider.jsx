import { createContext, useState } from "react";

export const LeaderBoardContext = createContext(null);

export function LeaderBoardProvider({ children }) {
  const [leadersList, setLeadersList] = useState(null);
  return <LeaderBoardContext.Provider value={{ leadersList, setLeadersList }}>{children}</LeaderBoardContext.Provider>;
}
