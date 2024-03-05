import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkEasyMode } from "../../components/Cards/Cards";
import styles from "./SelectLevelPage.module.css";

export function SelectLevelPage() {
  const mode = checkEasyMode();
  const [level, setLevel] = useState("3");
  const [easyMode, setEasyMode] = useState(mode);

  const navigate = useNavigate();
  const handleClick = () => {
    const mode = easyMode ? "easy" : "hard";
    localStorage.setItem("mode", mode);
    navigate(`/game/${level}`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность</h1>
        <ul className={styles.levels}>
          <li className={styles.level}>
            <label>
              <input
                className={styles.levelInput}
                type="radio"
                value="3"
                checked={level === "3"}
                onChange={e => setLevel(e.target.value)}
              />

              <span className={styles.levelNumber}>1</span>
            </label>
          </li>
          <li className={styles.level}>
            <label>
              <input
                className={styles.levelInput}
                type="radio"
                value="6"
                checked={level === "6"}
                onChange={e => setLevel(e.target.value)}
              />
              <span className={styles.levelNumber}>2</span>
            </label>
          </li>
          <li className={styles.level}>
            <label>
              <input
                className={styles.levelInput}
                type="radio"
                value="9"
                checked={level === "9"}
                onChange={e => setLevel(e.target.value)}
              />
              <span className={styles.levelNumber}>3</span>
            </label>
          </li>
        </ul>
        <div>
          <label className={styles.modeGame}>
            <input
              className={styles.inputEasyMode}
              type="checkbox"
              checked={easyMode}
              onChange={() => setEasyMode(!easyMode)}
            />
            <span className={styles.customCheckBox}></span>
            <p className={styles.easyLevel}>Легкий режим (3 жизни)</p>
          </label>
        </div>
        <button className={styles.startGameButton} type="button" onClick={handleClick}>
          Играть
        </button>
      </div>
    </div>
  );
}
