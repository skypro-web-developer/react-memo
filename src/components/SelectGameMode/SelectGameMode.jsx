import { useDispatch } from "react-redux";
import styles from "./SelectGameMode.module.css";
import { gameModeReducer } from "../../store/slices/game";
export function SelectGameMode() {
  const dispatch = useDispatch();
  return (
    <div className={styles.checkbox}>
      <h2>Играть до 3-х ошибок</h2>
      <input onClick={() => dispatch(gameModeReducer())} type="checkBox"></input>
    </div>
  );
}
