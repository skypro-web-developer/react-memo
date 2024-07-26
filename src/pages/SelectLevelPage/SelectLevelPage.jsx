import { Link } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useContext } from "react";
import { EasyModeContext } from "../../context/context";

export function SelectLevelPage() {
  const { easy, setEasy } = useContext(EasyModeContext);
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
        <div className={styles.easyMode}>
          <p>Облегченный режим</p>
          <input type="checkbox" onChange={() => setEasy(!easy)} />
        </div>
      </div>
    </div>
  );
}
