import { Link, useNavigate } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useGameContext } from "../../Context";

export function SelectLevelPage() {
  const { isEasyMode, setIsEasyMode, level, setLevel } = useGameContext();
  const navigate = useNavigate();
  const handleLevelClick = value => {
    setLevel(value);
  };
  console.log(isEasyMode);
  const handlePlayClick = () => {
    navigate(`/game/${level}`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность </h1>

        <ul className={styles.levels}>
          <li className={styles.level}>
            <input type="radio" name="level" value="3" checked={level === "3"} onChange={() => {}} />
            <div
              className={level === "3" ? `{styles.levelLink} ${styles.checked}` : styles.levelLink}
              onClick={() => handleLevelClick("3")}
            >
              1
            </div>
          </li>
          <li className={styles.level}>
            <input type="radio" name="level" value="6" checked={level === "6"} onChange={() => {}} />
            <div
              className={level === "6" ? `{styles.levelLink} ${styles.checked}` : styles.levelLink}
              onClick={() => handleLevelClick("6")}
            >
              2
            </div>
          </li>
          <li className={styles.level}>
            <input type="radio" name="level" value="9" checked={level === "9"} onChange={() => {}} />
            <div
              className={level === "9" ? `{styles.levelLink} ${styles.checked}` : styles.levelLink}
              onClick={() => handleLevelClick("9")}
            >
              3
            </div>
          </li>
        </ul>
        <div className={styles.checkBox}>
          <input
            checked={isEasyMode}
            onChange={() => setIsEasyMode(!isEasyMode)}
            className={styles.checkboxLevel}
            type="checkbox"
          />
          <div className={styles.checkBoxText}>Легкий режим (3 жизни)</div>
        </div>
        <button onClick={handlePlayClick} className={styles.btnGame}>
          Играть
        </button>
        <Link className={styles.linkLidebord}>Перейти к лидерборду!</Link>
      </div>
    </div>
  );
}
