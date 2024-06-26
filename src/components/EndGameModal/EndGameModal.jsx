import styles from "./EndGameModal.module.css";
import { Button } from "../Button/Button";
import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { useState, useEffect } from "react";
import { postLeader } from "../../api";
import { useLeaders } from "../../context/hooks/useLeaders";
import { Link } from "react-router-dom";

export function EndGameModal({ isWon, gameDurationSeconds, gameDurationMinutes, achievements, onClick }) {
  const [newLeader, setNewLeader] = useState({
    name: "",
    time: gameDurationSeconds,
    achievements: achievements,
  });
  const { setLeaders, leaders } = useLeaders();
  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    setLeaders(leaders.sort((a, b) => +a.time - +b.time));
  }, [leaders, setLeaders]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewLeader({
      ...newLeader,
      [name]: value,
    });
  };
  const handleFormSubmit = e => {
    e.preventDefault();
    postLeader({ name: newLeader.name, time: newLeader.time, achievements: newLeader.achievements })
      .then(leaders => {
        setLeaders(leaders.leaders);
        setBtnDisabled(!btnDisabled);
        // Добавьте код для очистки поля ввода
        setNewLeader({ name: "", time: "", achievements: "" });
      })
      .catch(error => {
        console.log(error);
        alert(error);
      });
  };
  let title = isWon ? "Вы победили!" : "Вы проиграли!";
  if (gameDurationMinutes * 60 + gameDurationSeconds < leaders[2].time && isWon) {
    title = "Вы попали на лидерборд!";
  }
  let isLeader = gameDurationMinutes * 60 + gameDurationSeconds < leaders[2].time && isWon;

  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;

  const imgAlt = isWon ? "celebration emodji" : "dead emodji";

  return (
    <div className={styles.modal}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      <h2 className={styles.title}>{title}</h2>
      {isLeader && (
        <div className={styles.inputDiv}>
          <input
            className={styles.inputSave}
            type="text"
            name="name"
            value={newLeader.name}
            onChange={handleInputChange}
            id="formTitle"
            placeholder="Пользователь"
            autoFocus=""
          />
          <button className={styles.btnsave} onClick={handleFormSubmit} disabled={btnDisabled}>
            Сохранить
          </button>
        </div>
      )}
      <p className={styles.description}>Затраченное время:</p>
      <div className={styles.time}>
        {gameDurationMinutes.toString().padStart("2", "0")}.{gameDurationSeconds.toString().padStart("2", "0")}
      </div>

      <Button onClick={onClick}>Играть снова</Button>
      <div>
        <Link to="/leaderboard">
          <p>Перейти к лидерборду</p>
        </Link>
      </div>
    </div>
  );
}
