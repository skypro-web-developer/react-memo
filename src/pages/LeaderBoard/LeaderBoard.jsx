import styles from "./LeaderBoard.module.css";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";

export function LeaderBoard() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <h1 className={styles.heading}>Лидерборд</h1>
          <Button children={"Начать игру"} onClick={() => navigate("/")} />
        </div>
      </div>
    </div>
  );
}
