import { Link } from "react-router-dom";
import styles from "./LeaderBoard.module.css";

export function LeaderBoard() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.headerText}>Лидерборд</p>
        <Link className={styles.headerButton} to="/">
          Начать игру
        </Link>
      </div>
      <div className={styles.rowHeader}>
        <p className={styles.textRowHeader}>Позиция</p>
        <p className={styles.textRowHeader}>Пользователь</p>
        <p className={styles.textRowHeader}>Время</p>
      </div>
    </div>
  );
}
