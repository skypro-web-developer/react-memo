import { useEffect, useState } from "react";
import styles from "./LeaderboardPage.module.css";
import classNames from "classnames";
import { getLeaders } from "../../api";
import { Link } from "react-router-dom";

export function LeaderboardPage() {
  const [leaders, setLeaders] = useState(null);

  useEffect(() => {
    getLeaders().then(data => {
      setLeaders(data.leaders);
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Лидерборд</h1>
        <Link to="/" className={styles.button}>
          Начать игру
        </Link>
      </div>
      <ul className={styles.leaderboard}>
        <li className={classNames(styles.leaderboardItem, styles.leaderboardHeader)}>
          <div>Позиция</div>
          <div>Пользователь</div>
          <div>Время</div>
        </li>
        {!leaders ? (
          <div className={styles.loader}>Данные загружаются...</div>
        ) : (
          leaders.map((leader, index) => (
            <li className={styles.leaderboardItem} key={leader.id}>
              <div>#{index + 1}</div>
              <div>{leader.name}</div>
              <div>{leader.time}</div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
