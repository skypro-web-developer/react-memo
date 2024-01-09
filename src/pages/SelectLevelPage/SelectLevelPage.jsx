import { Link } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useDispatch } from "react-redux";
import { setIsActiveGameMode } from "../../store/slices";

export function SelectLevelPage() {
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность</h1>
        <ul className={styles.levels}>
          <li className={styles.level}>
            <Link className={styles.levelLink} to="/game/3">
              1
            </Link>
          </li>
          <li className={styles.level}>
            <Link className={styles.levelLink} to="/game/6">
              2
            </Link>
          </li>
          <li className={styles.level}>
            <Link className={styles.levelLink} to="/game/9">
              3
            </Link>
          </li>
        </ul>
        <div className={styles.rules}>
          <h2 className={styles.heading}>Играть до 3 ошибок</h2>
          <input className={styles.input} type="checkbox" onClick={dispatch(setIsActiveGameMode())} />
        </div>
      </div>
    </div>
  );
}
