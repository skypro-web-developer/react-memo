// import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import styles from "./SelectLevelPage.module.css";
import { useEffect, useState } from "react";

export function SelectLevelPage() {
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

  useEffect(() => {
    console.log(level);
  }, [level]);

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность</h1>
        <ul className={styles.levels}>
          {LEVELS.map(item => {
            return (
              // $props={LEVELS.includes(level)}
              <li className={`${styles.level} ${LEVELS[item - 1] === level && styles.selected}`} key={item}>
                <button className={styles.levelLink} onClick={() => setLevel(item)}>
                  {item}
                </button>
              </li>
            );
          })}
          {/* <li className={styles.level}>
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
          </li> */}
        </ul>
        {/* <h2 className={styles.subtitle}>Включить счетчик попыток</h2> */}

        <label className={styles.subtitle}>
          <input type="checkbox" name="attempts" className={styles.input} onChange={toggleAttemptsFlag} />
          {/* <span class={styles.customCheckbox}></span> */}
          Cчетчик попыток
        </label>
        <Button>Начать игру</Button>
      </div>
    </div>
  );
}
