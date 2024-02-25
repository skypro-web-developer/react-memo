import { useEffect, useState } from "react";
import { getLeaderBoard } from "../../api";
import { useGameContext } from "../../Context";

export function LeaderBoard() {
  const { leaderboardPlayers, setLeaderboardPlayers } = useGameContext();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getLeaderBoard().then(res => {
      setLeaderboardPlayers(res);
      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return "Загрузка";
  }
  console.log(leaderboardPlayers);
  return (
    <div>
      <input placeholder="Чемпион"></input>
    </div>
  );
}
