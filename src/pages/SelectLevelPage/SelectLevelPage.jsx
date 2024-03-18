// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import styles from "./SelectLevelPage.module.css";
import { useEffect, useState } from "react";

export function SelectLevelPage() {
  const navigate = useNavigate();
  const LEVELS = [1, 2, 3];
  const [level, setLevel] = useState(1);
  const [attemptsFlag, setAttemptsFlag] = useState(false);

  useEffect(() => {
    // console.log(attemptsFlag);
    localStorage.setItem("attemptsFlag", attemptsFlag);
  }, [attemptsFlag]);

  const toggleAttemptsFlag = () => {
    setAttemptsFlag(!attemptsFlag);
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность</h1>
        <ul className={styles.levels}>
          {LEVELS.map(item => {
            return (
              <li className={`${styles.level} ${LEVELS[item - 1] === level && styles.selected}`} key={item}>
                <button className={styles.levelLink} onClick={() => setLevel(item)}>
                  {item}
                </button>
              </li>
            );
          })}
        </ul>

        <label className={styles.subtitle}>
          <input type="checkbox" name="attempts" className={styles.input} onChange={toggleAttemptsFlag} />
          Cчетчик попыток
        </label>

        <Button
          onClick={() => {
            navigate(`/game/${level * 3}`);
          }}
        >
          Начать игру
        </Button>
      </div>
    </div>
  );
}
