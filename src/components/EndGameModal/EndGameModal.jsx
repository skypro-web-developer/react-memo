import styles from "./EndGameModal.module.css";

import { Button } from "../Button/Button";

import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { Link, useNavigate } from "react-router-dom";
import { postLeaders } from "../../api";
import { useContext, useState } from "react";
import { LeaderBoardContext } from "../LeaderBoardProvider/LeaderBoardProvider";

export function EndGameModal({ isWon, gameDurationSeconds, gameDurationMinutes, hardLevel, onClick }) {
  const title = isWon ? "Вы победили!" : "Вы проиграли!";

  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;

  const imgAlt = isWon ? "celebration emodji" : "dead emodji";

  const timeOfGame = gameDurationMinutes * 60 + gameDurationSeconds;

  const [dataNewLeader, setDataNewLeader] = useState({ name: null, time: timeOfGame });
  const { leadersList, setLeadersList } = useContext(LeaderBoardContext);
  const [isNewLeader, setIsNewLeader] = useState(timeOfGame < leadersList[9].time && hardLevel);
  const navigate = useNavigate(null);

  const addNewLeader = async () => {
    await postLeaders({ dataNewLeader }, setLeadersList);
    await setIsNewLeader(false);
    navigate("/");
  };

  return (
    <div className={styles.modal}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      <h2 className={styles.title}>{isNewLeader && isWon ? "Вы попали на Лидерборд!" : title}</h2>
      {isNewLeader && isWon && (
        <input
          className={styles.input}
          type="text"
          placeholder="Пользователь"
          onChange={e => setDataNewLeader({ ...dataNewLeader, name: e.target.value })}
        />
      )}
      <p className={styles.description}>Затраченное время:</p>
      <div className={styles.time}>
        {gameDurationMinutes.toString().padStart("2", "0")}.{gameDurationSeconds.toString().padStart("2", "0")}
      </div>

      {isNewLeader && isWon ? (
        <Button onClick={() => addNewLeader()}>Играть снова</Button>
      ) : (
        <Button onClick={onClick}>Начать сначала</Button>
      )}
      {isNewLeader && isWon && (
        <Link className={styles.leaderBoardLink} to="/leader-board">
          Перейти к лидерборду
        </Link>
      )}
    </div>
  );
}
