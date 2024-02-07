import { Link } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setEasyMode } from "../../store/slices";

export function SelectLevelPage() {
  // Статус режима игры до трех ошибок
  const isEasyMode = useSelector(store => store.game.setEasyMode);

  const dispatch = useDispatch();

  // Обработчик изменения состояния чекбокса для установки режима игры до трех ошибок
  const handleCheckboxChange = event => {
    dispatch(setEasyMode(event.target.checked));
  };

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
        <label className={styles.checkboxContainer}>
          <input type="checkbox" name="checkbox-attempt" checked={isEasyMode} onChange={handleCheckboxChange} />
          <span className={styles.checkboxCustom}></span>
          Лёгкий режим: три попытки
        </label>
      </div>
    </div>
  );
}
