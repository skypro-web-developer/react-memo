import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./EndGameModal.module.css";
import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { Button } from "../Button/Button";
import { TextField } from "../TextField/TextField";
import { addLeader, getLeaders } from "../../api";

export function EndGameModal({ isWon, gameDurationSeconds, gameDurationMinutes, onClick }) {
  const [isLeader, setIsLeader] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [leaderName, setLeaderName] = useState("");

  const totalTime = gameDurationSeconds + gameDurationMinutes * 60;

  useEffect(() => {
    if (!isWon) {
      setIsLoading(false);
      return;
    }

    getLeaders().then(({ leaders }) => {
      if (isWon && (totalTime < leaders[leaders.length - 1].time || leaders.length < 10)) {
        setIsLeader(true);
      }
      setIsLoading(false);
    });
  }, [totalTime, isWon]);

  const title = isLeader ? "Вы попали на Лидерборд!" : isWon ? "Вы победили!" : "Вы проиграли!";
  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;
  const imgAlt = isWon ? "celebration emodji" : "dead emodji";

  const onTextFieldChange = event => setLeaderName(event.target.value);

  const onButtonResetClick = () => {
    if (!isLeader) {
      onClick();
      return;
    }

    addLeader({
      name: leaderName,
      time: totalTime,
    })
      .then(onClick)
      .catch(() => alert("Не удалось добавить пользователя"));
  };

  return (
    <>
      {isLoading ? (
        <div className={styles.loader}>Данные загружаются...</div>
      ) : (
        <div className={styles.modal}>
          <img className={styles.image} src={imgSrc} alt={imgAlt} />
          <h2 className={styles.title}>{title}</h2>
          {isLeader && (
            <TextField
              id="leaderName"
              name="leaderName"
              placeholder="Пользователь"
              onChange={onTextFieldChange}
              value={leaderName}
            />
          )}
          <p className={styles.description}>Затраченное время:</p>
          <div className={styles.time}>
            {gameDurationMinutes.toString().padStart(2, "0")}.{gameDurationSeconds.toString().padStart(2, "0")}
          </div>
          <Button onClick={onButtonResetClick}>Начать сначала</Button>
          <Link to="/leaderboard" className={styles.link}>
            Перейти в лидерборд
          </Link>
        </div>
      )}
    </>
  );
}
