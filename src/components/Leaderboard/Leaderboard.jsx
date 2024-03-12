import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const handleClickMode = () => {
    navigate("/");
  };

  return (
    <div className={styles.containerLeader}>
      <div className={styles.leaderContainer}>
        <div className={styles.heading}>Лидерборд</div>
        <button className={styles.startButtonLeaderBoard} type="button" onClick={handleClickMode}>
          Начать игру
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
              <div className={styles.infoTextUser}>
                <p className={styles.numberUser}># {index + 1}</p>
              </div>
              <div className={styles.infoTextUser}>
                <p className={styles.userName}>{leader.name}</p>
              </div>
            </div>
            <div className={styles.achievements}>
              {leader.achievements?.includes(1) ? (
                <div className={styles.achievements_elemen} title="Игра пройдена в сложном режимe">
                  <button className={styles.puzzleGame}></button>
                </div>
              ) : (
                <button className={styles.puzzleGameOff}></button>
              )}
              {leader.achievements?.includes(2) ? (
                <div className={styles.achievements_elemen} title="Игра пройдена без супер-сил">
                  <button className={styles.openGame}></button>
                </div>
              ) : (
                <button className={styles.openGameOff}></button>
              )}
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
