import styles from "./LeaderBoardItem.module.css";

export function LeaderBoardItem({ position, user, time, isTemplate }) {
  return (
    <div className={styles.container}>
      <p className={isTemplate ? styles.template : styles.item}>{isTemplate ? "Позиция" : `# ${position}`}</p>
      <p className={isTemplate ? styles.template : styles.item}>{isTemplate ? "Пользователь" : user}</p>
      <p className={isTemplate ? styles.template : styles.item}>{isTemplate ? "Время" : time}</p>
    </div>
  );
}
