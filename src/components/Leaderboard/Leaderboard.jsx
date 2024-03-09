import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLeaders } from "../../api";
import styles from "./Leaderboard.module.css";

const farmatSeconds = time => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, "0")}: ${seconds.toString().padStart(2, "0")}`;
};
export function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  useEffect(() => {
    getLeaders().then(data => {
      const sortedLeaders = [...data];
      setLeaders(sortedLeaders.sort((a, b) => a.time - b.time));
    });
  }, []);
  return (
    <div className={styles.containerLeader}>
      <div className={styles.leaderContainer}>
        <div className={styles.heading}>Лидерборд</div>
        <button className={styles.startButtonLeaderBoard} type="button">
          Играть
        </button>
      </div>
      <div className={styles.containerInfoPanel}>
        <div className={styles.infoPanel}>
          <div className={styles.infoPositionName}>
            <div className={styles.infoText}>Позиция</div>
            <div className={styles.infoText}>Пользователь</div>
          </div>
          <div className={styles.infoTextTime}>Время</div>
        </div>

        {leaders.map((leader, index) => (
          <div key={index} className={styles.infoPanel}>
            <div className={styles.infoPositionName}>
              <div className={styles.infoTextUser}># {index + 1}</div>
              <div className={styles.infoTextUser}>{leader.name}</div>
            </div>
            <div className={styles.infoTextUser}>{farmatSeconds(leader.time)}</div>
          </div>
        ))}
      </div>
      <Link className={styles.backGameLeaderBoard} to="/">
        Вернуться назад
      </Link>
    </div>
  );
}
