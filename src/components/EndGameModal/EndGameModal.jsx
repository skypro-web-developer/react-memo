import styles from "./EndGameModal.module.css";

import { Button } from "../Button/Button";

import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { sendLeader } from "../../services/API";
import { getTimeInSeconds } from "../../utils/helpers";

export function EndGameModal({
  isWon,
  gameDurationSeconds,
  gameDurationMinutes,
  onClick,
  isOnLeaderboard,
  wasPowUsed,
}) {
  const [inputValue, setInputValue] = useState("");
  const title = isOnLeaderboard ? "Вы попали на Лидерборд" : isWon ? "Вы победили!" : "Вы проиграли!";
  const timeInSeconds = getTimeInSeconds({ minutes: gameDurationMinutes, seconds: gameDurationSeconds });
  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;

  const imgAlt = isWon ? "celebration emodji" : "dead emodji";

  const achievements = wasPowUsed ? [1] : [1, 2];

  return (
    <div className={`${styles.modal} ${isOnLeaderboard && styles.height634}`}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      <h2 className={styles.title}>{title}</h2>
      {isOnLeaderboard && (
        <form
          onSubmit={e => {
            e.preventDefault();
            console.log("Форма отправилась");
            sendLeader({ name: inputValue, time: timeInSeconds, achievements });
          }}
        >
          <input
            placeholder="Пользователь"
            className={styles.input}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            type="text"
          />
        </form>
      )}
      <p className={styles.description}>Затраченное время:</p>
      <div className={styles.time}>
        {gameDurationMinutes.toString().padStart("2", "0")}.{gameDurationSeconds.toString().padStart("2", "0")}
      </div>

      <Button onClick={onClick}>Начать сначала</Button>
      {isOnLeaderboard && (
        <Link className={styles.link} to="/leaderboard">
          Перейти к Лидерборду
        </Link>
      )}
    </div>
  );
}
