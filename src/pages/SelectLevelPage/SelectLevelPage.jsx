import { Link } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useState } from "react";

export function SelectLevelPage() {
  const [mode, setMode] = useState(false);

  function chengeCheckbox() {
    setMode(!mode);
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность</h1>
        <ul className={styles.levels}>
          <li className={styles.level}>
            <Link className={styles.levelLink} to={`/game/3_${mode}`}>
              1
            </Link>
          </li>
          <li className={styles.level}>
            <Link className={styles.levelLink} to={`/game/6_${mode}`}>
              2
            </Link>
          </li>
          <li className={styles.level}>
            <Link className={styles.levelLink} to={`/game/9_${mode}`}>
              3
            </Link>
          </li>
        </ul>
        <div className="toggle-pill-dark">
          <input type="checkbox" id="pill4" name="check" checked={mode} onChange={chengeCheckbox}/>
            <label htmlFor="pill4"></label>
        </div>

        {mode ? <p className={styles.mode}>Легкий режим (3 жизни)</p> : <p className={styles.noMode}>Стандартная игра</p> }

      </div>
    </div>
  );
}
