import { Link } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useContext, useEffect } from "react";
import { ModeContext } from "../../ModeProvider/ModeProvider";
import { getLeaders } from "../../api";
import { LeaderBoardContext } from "../../components/LeaderBoardProvider/LeaderBoardProvider";

export function SelectLevelPage() {
  const { addMode, setAddMode } = useContext(ModeContext);
  const { setLeadersList } = useContext(LeaderBoardContext);

  function setMode() {
    setAddMode(prev => !prev);
  }

  useEffect(() => {
    getLeaders({ setLeadersList }).catch(() => {
      alert("Данных нет");
    });
  }, [setLeadersList]);

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
        <div className={styles.levels}>
          <input className={styles.input} type="checkbox" onChange={setMode} checked={addMode} />
          <p className={styles.text}>Легкий режим (3 жизни) </p>
        </div>
        <Link className={styles.leaderBoardLink} to="/leader-board">
          Перейти к лидерборду
        </Link>
      </div>
    </div>
  );
}
