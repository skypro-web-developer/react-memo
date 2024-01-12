import { Link } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { SelectGameMode } from "../../components/SelectGameMode/SelectGameMode";
import { useDispatch } from "react-redux";
import { currentLevel } from "../../store/slices/game";

export function SelectLevelPage() {
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность</h1>
        <ul className={styles.levels}>
          <li className={styles.level}>
            <Link
              className={styles.levelLink}
              to="/game/3"
              onClick={() => {
                dispatch(currentLevel(1));
              }}
            >
              1
            </Link>
          </li>
          <li className={styles.level}>
            <Link
              className={styles.levelLink}
              to="/game/6"
              onClick={() => {
                dispatch(currentLevel(2));
              }}
            >
              2
            </Link>
          </li>
          <li className={styles.level}>
            <Link
              className={styles.levelLink}
              to="/game/9"
              onClick={() => {
                dispatch(currentLevel(3));
              }}
            >
              3
            </Link>
          </li>
        </ul>
        <SelectGameMode />
        <Link className={styles.button} to="/leaderboard">
          Перейти к лидерборду
        </Link>
      </div>
    </div>
  );
}
