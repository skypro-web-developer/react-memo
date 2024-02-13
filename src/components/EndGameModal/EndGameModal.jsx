import styles from "./EndGameModal.module.css";
import { Button } from "../Button/Button";
import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { postUserScore } from "../../api";

export function EndGameModal({ isLeader, isWon, gameDurationSeconds, gameDurationMinutes, onClick }) {
  const [userName, setUserName] = useState(""); // Состояние для хранения введенного имени пользователя

  // Функция для обработки изменений в поле ввода имени
  const handleNameChange = event => {
    setUserName(event.target.value); // Обновляем состояние с введенным именем
  };

  const handleAddLeader = () => {
    const nameToSend = userName.trim() !== "" ? userName : "Пользователь";
    postUserScore({ name: nameToSend, time: gameDurationSeconds });
    onClick();
  };

  const title = isWon ? (isLeader === true ? "Вы попали на Лидерборд!" : "Вы победили!") : "Вы проиграли!";

  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;

  const imgAlt = isWon ? "celebration emodji" : "dead emodji";

  return (
    <div className={styles.modal}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      <h2 className={styles.title}>{title}</h2>
      {isLeader ? (
        <input
          className={styles.inputName}
          placeholder="Пользователь"
          value={userName}
          onChange={handleNameChange}
        ></input>
      ) : (
        ""
      )}
      <p className={styles.description}>Затраченное время:</p>
      <div className={styles.time}>
        {gameDurationMinutes.toString().padStart("2", "0")}.{gameDurationSeconds.toString().padStart("2", "0")}
      </div>

      <Button onClick={handleAddLeader}>Начать сначала</Button>
      {isLeader ? (
        <Link className={styles.leaderboardLink} to="/leaderboard" onClick={handleAddLeader}>
          Перейти к лидерборду
        </Link>
      ) : (
        ""
      )}
    </div>
  );
}
