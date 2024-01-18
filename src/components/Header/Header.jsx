import { Button } from "../Button/Button";
import styles from "./Header.module.css";
import superEye from "./img/super-eye.png";
import superCards from "./img/super-cards.png";
import { useEffect, useState } from "react";

export function Header({ status, timer, isEasyMode, previewSeconds, resetGame, tryes, aloha, insight }) {
  const [isAlohaActive, setIsAlohaActive] = useState(true);
  const [isIsightActive, setIsIsightActive] = useState(true);

  useEffect(() => {
    setIsAlohaActive(true);
    setIsIsightActive(true);
  }, [status]);

  return (
    <div className={styles.header}>
      <div className={styles.timer}>
        {status === "STATUS_PREVIEW" ? (
          <div>
            <p className={styles.previewText}>Запоминайте пары!</p>
            <p className={styles.previewDescription}>Игра начнется через {previewSeconds} секунд</p>
          </div>
        ) : (
          <>
            <div className={styles.timerValue}>
              <div className={styles.timerDescription}>min</div>
              <div>{timer.minutes.toString().padStart("2", "0")}</div>
            </div>
            .
            <div className={styles.timerValue}>
              <div className={styles.timerDescription}>sec</div>
              <div>{timer.seconds.toString().padStart("2", "0")}</div>
            </div>
          </>
        )}
      </div>

      {status === "STATUS_IN_PROGRESS" && (
        <div className={styles.superPowers}>
          <div
            style={{ background: `url(${superEye}) center no-repeat, #c2f5ff` }}
            className={`${styles.superPower} ${styles.superEye} ${!isIsightActive && styles.disabled}`}
            onClick={() => {
              if (isIsightActive) {
                insight();
                setIsIsightActive(false);
              }
            }}
          ></div>
          <div
            style={{ background: `url(${superCards}) center no-repeat, #c2f5ff` }}
            className={`${styles.superPower} ${styles.superCards} ${!isAlohaActive && styles.disabled}`}
            onClick={() => {
              if (isAlohaActive) {
                aloha();
                setIsAlohaActive(false);
              }
            }}
          ></div>
        </div>
      )}

      {status === "STATUS_IN_PROGRESS" && isEasyMode && (
        <div className={styles.tryes_container}>
          <p className={styles.tryes_description}>Осталось попыток</p> <p className={styles.tryes_count}>{tryes}</p>
        </div>
      )}

      {status === "STATUS_IN_PROGRESS" ? <Button onClick={resetGame}>Начать заново</Button> : null}
    </div>
  );
}
