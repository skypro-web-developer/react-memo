import styles from "./LeaderBoardItem.module.css";

export function LeaderBoardItem({ position, user, time, isTemplate }) {
  return (
    <div className={styles.container}>
      <p className={isTemplate ? styles.template : styles.item}>{position}</p>
      <p className={isTemplate ? styles.template : styles.item}>{user}</p>
      <p className={isTemplate ? styles.template : styles.item}>{time}</p>
    </div>
  );
}
