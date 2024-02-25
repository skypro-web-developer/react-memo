import styles from "./EndGameModal.module.css";
import { Button } from "../Button/Button";
import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { ModeContext } from "../../context/ModeContext";
import { addLeaders, getLeaders } from "../../utils/api";

export function EndGameModal({ isWon, gameDurationSeconds, gameDurationMinutes, onClick }) {
  const { level } = useContext(ModeContext);
  const [leader, setLeader] = useState("Пользователь");
  const [newLeader, setNewLeader] = useState(false);
  const gameTime = gameDurationMinutes * 60 + gameDurationSeconds;

  useEffect(() => {
    if (level === "9" && isWon) {
      // если игрок выиграл 3 уровень сложности, получаем список лидеров
      getLeaders().then(({ leaders }) => {
        leaders = leaders.sort(function (a, b) {
          return a.time - b.time;
        });
        if (leaders.length > 0 && leaders[0].time < gameTime) {
          setNewLeader(true);
        }
      });
    }
  }, []);

  function addPlayerToLeaders() {
    addLeaders({
      name: leader,
      time: gameTime,
    })
      .then(({ leaders }) => {
        console.log(leaders);
      })
      .catch(error => {
        alert(error.message);
      });
  }

  const title = isWon ? "Вы попали на лидерборд!" : "Вы проиграли!";

  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;

  const imgAlt = isWon ? "celebration emodji" : "dead emodji";

  return (
    <div className={styles.modal}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      <h2 className={styles.title}>{title}</h2>
      {newLeader ? (
        <input
          className={styles.input_user}
          type="text"
          placeholder={"Пользователь "}
          onChange={e => {
            setLeader(e.target.value);
          }}
        />
      ) : (
        <div></div>
      )}
      <p className={styles.description}>Затраченное время:</p>
      <div className={styles.time}>
        {gameDurationMinutes.toString().padStart("2", "0")}.{gameDurationSeconds.toString().padStart("2", "0")}
      </div>
      {newLeader ? (
        <>
          <Button
            onClick={() => {
              addPlayerToLeaders();
              onClick();
            }}
          >
            Начать сначала
          </Button>
          <Link to="/">
            <Button
              onClick={() => {
                addPlayerToLeaders();
                onClick();
              }}
            >
              Вернуться к выбору сложности
            </Button>
          </Link>
        </>
      ) : (
        <>
          <Button onClick={onClick}>Начать сначала</Button>
          <Link to="/">
            <Button>Вернуться к выбору сложности</Button>
          </Link>
        </>
      )}
      {newLeader && (
        <Link to="/leaderboard" className={styles.linkBoard}>
          Перейти к лидерборду
        </Link>
      )}
    </div>
  );
}
