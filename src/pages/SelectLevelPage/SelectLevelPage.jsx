import { Link } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useContext } from "react";
import { DifficultyContext } from "../../contexts/DiffcultyContext";

export function SelectLevelPage() {
  const { isEasy, setIsEasy } = useContext(DifficultyContext);
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
        Легкий режим (3 жизни) <input type="checkbox" checked={isEasy} onChange={() => setIsEasy(!isEasy)} />
      </div>
    </div>
  );
}
