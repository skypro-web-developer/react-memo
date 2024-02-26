import { useEffect, useState } from "react";
import { getLeaderBoard } from "../../api";
import { useGameContext } from "../../Context";
import styles from "./LeaderBoard.module.css";
import { Button } from "../../components/Button/Button";
import { Link } from "react-router-dom";
export function LeaderBoard() {
  const { leaderboardPlayers, setLeaderboardPlayers } = useGameContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getLeaderBoard()
      .then(data => {
        if (data.leaders) {
          let leader = data.leaders;
          leader = leader.sort(function (a, b) {
            return a.time - b.time;
          });
          setLeaderboardPlayers(leader);
          setIsLoading(false);
        } else {
          alert("Данные LeaderBoard не были получены.");
        }
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);
  if (isLoading) {
    return "Loading LeaderBoard... ";
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.text}>Лидерборд</p>
          <Link to="/">
            <Button>Начать игру</Button>
          </Link>
        </div>
        <table>
          <thead className={styles.thead}>
            <tr className={styles.leaderboard}>
              <th className={styles.position}>Позиция</th>
              <th className={styles.user}>Пользователь</th>
              {/* <th className={styles.achievements}>Достижения</th> */}
              <th className={styles.time}>Время</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {leaderboardPlayers.map((leader, index) => (
              <tr className={styles.leader} key={leader.id}>
                <td className={styles.position}>#{index + 1}</td>
                <td className={styles.user}>{leader.name}</td>
                {/* <td className={styles.time}>{leader.time}</td> */}
                <td className={styles.time}>
                  {Math.floor(leader.time / 60)
                    .toString()
                    .padStart(2, "0")}
                  :{(leader.time % 60).toString().padStart(2, "0")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
