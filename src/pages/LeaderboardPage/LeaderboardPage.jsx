import styles from "./LeaderboardPage.module.css";
import { Button } from "../../components/Button/Button";
import { LeaderboardItem } from "../../components/LeaderboardItem/LeaderboardItem";
import { useEffect, useState } from "react";
import { getLeaders } from "../../services/API";
import { useNavigate } from "react-router-dom";
import { sortLeadersByTime } from "../../utils/helpers";

export function LeaderboardPage() {
  const navigate = useNavigate();
  const [leaders, setLeaders] = useState([]);

  const formatTime = timeInSeconds => {
    const seconds = ("0" + String(timeInSeconds % 60)).slice(-2);
    const minutes = ("0" + String(Math.floor(timeInSeconds / 60))).slice(-2);

    return `${minutes}:${seconds}`;
  };

  const leadersElements = leaders.map((el, index) => (
    <LeaderboardItem
      key={el.id}
      position={`#${index + 1}`}
      user={el.name}
      achievements={el.achievements}
      time={formatTime(el.time)}
    />
  ));

  useEffect(() => {
    getLeaders()
      .then(leaders => {
        console.log(leaders);
        const sortedLeaders = sortLeadersByTime(leaders.leaders);
        setLeaders(sortedLeaders);
      })
      .catch(error => console.warn(error));
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.topHeading}>Лидерборд</h1>
        <Button onClick={() => navigate("/")}>Начать игру</Button>
      </div>
      <ul className={styles.table}>
        <LeaderboardItem
          position={"Позиция"}
          user={"Пользователь"}
          time={"Время"}
          achievements={"Достижения"}
          color={"#999999"}
        />
        {leadersElements}
      </ul>
    </div>
  );
}
