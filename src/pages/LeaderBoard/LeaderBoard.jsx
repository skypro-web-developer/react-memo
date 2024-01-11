import styles from "./LeaderBoard.module.css";
import { Button } from "../../components/Button/Button";
import { LeaderBoardItem } from "../../components/LeaderBoardItem/LeaderBoardItem";

export function LeaderBoard() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <h1 className={styles.heading}>Лидерборд</h1>
          <Button children={"Начать игру"} />
        </div>
        <LeaderBoardItem position={"Позиция"} user={"Пользоатель"} time={"Время"} isTemplate={true} />
      </div>
    </div>
  );
}
