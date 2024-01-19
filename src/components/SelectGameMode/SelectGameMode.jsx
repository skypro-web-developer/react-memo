import { useDispatch, useSelector } from "react-redux";
import React from "react";
import styles from "./SelectGameMode.module.css";
import { gameModeReducer } from "../../store/slices/game";
export function SelectGameMode() {
  const { gameRegime } = useSelector(state => state.game);
  const dispatch = useDispatch();
  return (
    <div className={styles.checkbox}>
      <input
        onClick={() => {
          dispatch(gameModeReducer());
          console.log(gameRegime);
        }}
        type="checkBox"
        className={styles.input}
      ></input>
      <h2 className={styles.title}>Легкий режим (3 жизни)</h2>
    </div>
  );
}
