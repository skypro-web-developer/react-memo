import styles from "./LeaderBoard.module.css";
import { Button } from "../../components/Button/Button";
import { LeaderBoardItem } from "../../components/LeaderBoardItem/LeaderBoardItem";
import { useNavigate } from "react-router-dom";

export function LeaderBoard() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <h1 className={styles.heading}>Лидерборд</h1>
          <Button children={"Начать игру"} onClick={() => navigate("/")} />
        </div>
        <LeaderBoardItem position={"Позиция"} user={"Пользователь"} time={"Время"} isTemplate={true} />
      </div>
    </div>
  );
}
