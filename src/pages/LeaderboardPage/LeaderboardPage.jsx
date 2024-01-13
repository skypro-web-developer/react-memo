import styles from "./LeaderboardPage.module.css";
import { Button } from "../../components/Button/Button";
import { LeaderboardItem } from "../../components/LeaderboardItem/LeaderboardItem";

export function LeaderboardPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.topHeading}>Лидерборд</h1>
        <Button>Начать игру</Button>
      </div>
      <ul className={styles.table}>
        <LeaderboardItem position={"Позиция"} user={"Пользователь"} time={"Время"} color={"#999999"} />
      </ul>
    </div>
  );
}
