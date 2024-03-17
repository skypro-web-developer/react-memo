import { useEffect, useState } from "react";
import { getAllScore } from "../../api";
import styles from "./Leaderboard.module.css";
import { formatTime } from "../../helpers";

export function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    loadLeaderboardData(); // Загрузка данных лидерборда при монтировании компонента
  }, []);

  const loadLeaderboardData = () => {
    getAllScore()
      .then(data => {
        setLeaders(data.leaders); // Обновление данных лидерборда
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <div className={styles.leaderboardContainer}>
      <div className={`${styles.leaderboard} ${styles.leaderboardTitle}`}>
        <p className={styles.item}>Позиция</p>
        <p className={styles.itemCenter}>Пользователь</p>
        <p className={styles.item}>Время</p>
      </div>
      <>
        {leaders
          .slice()
          .sort((a, b) => a.time - b.time)
          .map((leader, index) => {
            const position = index + 1;
            return (
              <div className={styles.leaderboard} key={index}>
                <p className={styles.item}>{`# ${position}`}</p>
                <p className={styles.itemCenter}>{leader.name}</p>
                <p className={styles.item}>{formatTime(leader.time)}</p>
              </div>
            );
          })}
      </>
    </div>
  );
}