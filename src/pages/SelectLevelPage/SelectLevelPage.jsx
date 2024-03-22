import { Link } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useState } from "react";

export function SelectLevelPage() {
  const [mode, setMode] = useState(false);

  const tryCount = mode ? 3 : 1;

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность</h1>
        <ul className={styles.levels}>
          <li className={styles.level}>
            <Link className={styles.levelLink} to={`/game/3/${tryCount}`}>
              1
            </Link>
          </li>
          <li className={styles.level}>
            <Link className={styles.levelLink} to={`/game/6/${tryCount}`}>
              2
            </Link>
          </li>
          <li className={styles.level}>
            <Link className={styles.levelLink} to={`/game/9/${tryCount}`}>
              3
            </Link>
          </li>
        </ul>
        <div>
          <input id="cb-mode" type="checkbox" value={mode} onChange={e => setMode(e.target.checked)} />
          <label for="cb-mode">Упрощенный режим</label>
        </div>
      </div>
    </div>
  );
}
