import styles from "./LeaderboardItem.module.css";

export function LeaderboardItem({ position, user, time, color = "black" }) {
  return (
    <li style={{ color: color }} className={styles.item}>
      <span className={styles.position}>{position}</span>
      <span className={styles.user}>{user}</span>
      <span className={styles.time}>{time}</span>
    </li>
  );
}
