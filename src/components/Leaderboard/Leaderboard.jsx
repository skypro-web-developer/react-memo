import React from "react";
import { Link } from "react-router-dom";
import styles from "./Leaderboard.module.css";
export function Leaderboard() {
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
        <div className={styles.infoPanel}>
          <div className={styles.infoPositionName}>
            <div className={styles.infoTextUser}># 1</div>
            <div className={styles.infoTextUser}>ab98awj_918mlz1lavfh_ru</div>
          </div>
          <div className={styles.infoTextUser}>01:30</div>
        </div>
      </div>
      <Link className={styles.backGameLeaderBoard} to="/">
        Вернуться назад
      </Link>
    </div>
  );
}
