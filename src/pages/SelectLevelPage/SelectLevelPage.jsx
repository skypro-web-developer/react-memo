import { useNavigate } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useState } from "react";

export function SelectLevelPage() {
  // Использую navigate для передачи стейта, чтобы не подключать
  // Redux ради одного флага
  const navigate = useNavigate();
  const [isEasyMode, setIsEasyMode] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность</h1>
        <ul className={styles.levels}>
          <li className={styles.level} onClick={() => navigate("/game/3", { state: isEasyMode })}>
            <span className={styles.levelLink}>1</span>
          </li>
          <li className={styles.level} onClick={() => navigate("/game/6", { state: isEasyMode })}>
            <span className={styles.levelLink}>2</span>
          </li>
          <li className={styles.level} onClick={() => navigate("/game/9", { state: isEasyMode })}>
            <span className={styles.levelLink}>3</span>
          </li>
        </ul>
        <div className={styles.easyMode}>
          <label className={styles.easyMode_label}>
            <input
              type="checkbox"
              value={isEasyMode}
              onClick={() => {
                setIsEasyMode(!isEasyMode);
                console.log(isEasyMode);
              }}
            />
            Включить облегченный режим с тремя попытками
          </label>
        </div>
      </div>
    </div>
  );
}
