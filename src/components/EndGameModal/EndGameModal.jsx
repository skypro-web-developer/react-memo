import styles from "./EndGameModal.module.css";

import { Button } from "../Button/Button";

import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addLeader, getLeaders } from "../../api";
import { Link } from "react-router-dom";

export function EndGameModal({ isWon, gameDurationSeconds, gameDurationMinutes, onClick }) {
  const [leader, setLeader] = useState("Пользователь");
  const [playerIsALiader, setPlayerIsALiader] = useState(false);
  const fullGameTime = gameDurationSeconds + gameDurationMinutes * 60;
  const level = useSelector(state => state.game.level);
  useEffect(() => {
    if (level === 3 && isWon) {
      getLeaders().then(({ leaders }) => {
        console.log(leaders);
        // let leader = data.leaders;
        leaders = leaders.sort(function (a, b) {
          return a.time - b.time;
        });
        if (leaders[leaders.length - 1].time > fullGameTime) {
          setPlayerIsALiader(true);
        }
      });
    }
  }, []);

  const playerInLeaders = () => {
    addLeader({
      name: leader,
      time: fullGameTime,
    })
      .then(newLeaders => {
        console.log(newLeaders);
      })
      .catch(() => alert("Ошибка добавления пользователя"));
  };

  const resetGame = () => {
    if (level === 3) {
      playerInLeaders();
    }
    onClick();
  };

  const title = isWon ? "Вы победили!" : "Вы проиграли!";

  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;

  const imgAlt = isWon ? "celebration emodji" : "dead emodji";

  return (
    <div className={styles.modal}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      <h2 className={styles.title}>{title}</h2>
      {playerIsALiader ? (
        <input
          type="text"
          className={styles.input}
          placeholder={"Пользователь"}
          onChange={event => {
            setLeader(event.target.value);
          }}
        />
      ) : null}

      <p className={styles.description}>Затраченное время:</p>
      <div className={styles.time}>
        {gameDurationMinutes.toString().padStart("2", "0")}.{gameDurationSeconds.toString().padStart("2", "0")}
      </div>

      <Button
        onClick={() => {
          resetGame();
        }}
      >
        Начать сначала
      </Button>
      {playerIsALiader ? (
        <Link
          className={styles.button}
          to="/leaderboard"
          onClick={() => {
            playerInLeaders();
          }}
        >
          Перейти к лидерборду
        </Link>
      ) : null}
    </div>
  );
}
