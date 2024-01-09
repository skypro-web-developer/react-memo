import { useDispatch, useSelector } from "react-redux";
import { setIsActiveGameMode } from "../../store/slices";
import styles from "./Checkbox.module.css";

export function Checkbox() {
  const dispatch = useDispatch();
  const handleCheckboxChange = event => {
    dispatch(setIsActiveGameMode(event.target.value));
  };

  const isActiveGameMode = useSelector(store => store.game.isActiveGameMode);

  return (
    <div className={styles.rules}>
      <h2 className={styles.heading}>Играть до 3 ошибок</h2>
      <label htmlFor="activateMode">
        <input className={styles.input} type="checkbox" checked={isActiveGameMode} onChange={handleCheckboxChange} />
      </label>
    </div>
  );
}
