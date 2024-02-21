import { Link } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useGameContext } from "../../Context";

export function SelectLevelPage() {
  const {isEasyMode,setIsEasyMode}=useGameContext()
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность </h1>

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
        <label><input onChange={(e)=>setIsEasyMode(e.target.value)} className={styles.checkboxLevel} type="checkbox"/>Новый режим!</label>
      </div>
    </div>
  );
}
