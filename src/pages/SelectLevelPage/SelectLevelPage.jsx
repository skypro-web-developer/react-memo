import { Link } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useEasyMode } from "../../context/hooks/useEasyMode";
import { getLeaders } from "../../api";
import { useLeaders } from "../../context/hooks/useLeaders";
import { useEffect } from "react";

export function SelectLevelPage() {
  const { setLeaders } = useLeaders();
  const { easyModeSelect } = useEasyMode();
  useEffect(() => {
    getLeaders().then(response => {
      setLeaders(response.leaders);
    });
  }, [setLeaders]);
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.toggleSwitch}>
          <input type="checkbox" onClick={easyModeSelect} />
          <label>Легкий режим (3 жизни)</label>
        </div>
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
        <div>
          <Link to="/leaderboard">
            <p>Перейти к лидерборду</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
