import { Link } from "react-router-dom";
import styles from "./LeaderBoard.module.css";
import { useContext } from "react";
import { LeaderBoardContext } from "../../components/LeaderBoardProvider/LeaderBoardProvider";

export function LeaderBoard() {
  const { leadersList } = useContext(LeaderBoardContext);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.headerText}>Лидерборд</p>
        <Link className={styles.headerButton} to="/">
          Начать игру
        </Link>
      </div>
      <div className={styles.row}>
        <p className={styles.textRowHeader}>Позиция</p>
        <p className={styles.textRowHeader}>Пользователь</p>
        <p className={styles.textRowHeader}>Достижения</p>
        <p className={styles.textRowHeader}>Время</p>
      </div>
      {leadersList.map((leader, index) => {
        const minutes = Math.floor(leader.time / 60)
          .toString()
          .padStart("2", "0");
        const seconds = (leader.time % 60).toString().padStart("2", "0");
        return (
          <div key={leader.id} className={styles.row}>
            <p className={styles.textRowLeader}>{`#${index + 1}`}</p>
            <p className={styles.textRowLeader}>{leader.name}</p>
            <p className={styles.textRowLeader}>{`${minutes}:${seconds}`}</p>
            <p className={styles.textRowLeader}>{`${minutes}:${seconds}`}</p>
          </div>
        );
      })}
    </div>
  );
}
