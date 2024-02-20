import { useNavigate } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { Button } from "../../components/Button/Button";
import useModes from "../../hooks/useModes";
import { Checkbox } from "../../Checkbox/Checkbox";

export function SelectLevelPage() {
  const { mode, changeMode, level, setLevel } = useModes();
  const navigate = useNavigate();

  const handlePlayClick = () => {
    navigate(`/game/${level}`, { state: { mode } });
    console.log(mode);
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <form className={styles.levels}>
          <label className={styles.level}>
            <input type="radio" value="3" checked={level === 3} onChange={e => setLevel(e.target.value)} />
            <div className={styles.levelText}>1</div>
          </label>
          <br />
          <label className={styles.level}>
            <input type="radio" value="6" checked={level === 6} onChange={e => setLevel(e.target.value)} />
            <div className={styles.levelText}>2</div>
          </label>
          <br />
          <label className={styles.level}>
            <input type="radio" value="9" checked={level === 9} onChange={e => setLevel(e.target.value)} />
            <div className={styles.levelText}>3</div>
          </label>
        </form>
        <Checkbox className={styles.mode} onClick={changeMode}>
          Включить легкий режим
        </Checkbox>
        {level === null ? <button disabled>Играть</button> : <Button onClick={handlePlayClick}>Играть</Button>}
      </div>
    </div>
  );
}
