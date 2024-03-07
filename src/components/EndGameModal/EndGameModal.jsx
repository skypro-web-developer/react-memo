import styles from "./EndGameModal.module.css";

import { Button } from "../Button/Button";

import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { addLeader } from "../../api";

export function EndGameModal({ isWon, gameDurationSeconds, gameDurationMinutes, onClick, isLeader }) {
  const [userName, setUserName] = useState("");
  const [isResultSent, setIsResultSent] = useState(false);
  const title = isLeader ? "Вы попали на лидерборд" : isWon ? "Вы победили!" : "Вы проиграли!";

  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;

  const imgAlt = isWon ? "celebration emodji" : "dead emodji";
  const handleClick = () => {
    if (!userName.trim()) {
      alert("Вы ввели пустую строку");
      return;
    }
    const time = gameDurationMinutes * 60 + gameDurationSeconds;
    addLeader({ name: userName, time }).then(() => {
      setIsResultSent(true);
      alert("Ресультат отправлен");
    });
  };
  return (
    <div className={styles.modal}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      <h2 className={styles.title}>{title}</h2>
      {isLeader && !isResultSent && (
        <div>
          <input type="text" placeholder="Пользователь" value={userName} onChange={e => setUserName(e.target.value)} />
          <Button onClick={handleClick}>Отправить</Button>
        </div>
      )}
      <p className={styles.description}>Затраченное время:</p>
      <div className={styles.time}>
        {gameDurationMinutes.toString().padStart("2", "0")}.{gameDurationSeconds.toString().padStart("2", "0")}
      </div>

      <Button onClick={onClick}>Начать сначала</Button>
      <Link className={styles.backGameLeader} to="/Leaderboard">
        Перейти к лидерборду
      </Link>
    </div>
  );
}
