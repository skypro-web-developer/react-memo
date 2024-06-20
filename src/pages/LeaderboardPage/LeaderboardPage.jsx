import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import styles from "./LeaderboardPage.module.css";
import { useLeaders } from "../../context/hooks/useLeaders";

export function LeaderboardPage() {
  const { leaders, setLeaders } = useLeaders();
  setLeaders(leaders.sort((a, b) => +a.time - +b.time));
  return (
    <div>
      <div className={styles.header}>
        <p className={styles.title}>Лидерборд</p>
        <Link to="/">
          <Button>Начать игру</Button>
        </Link>
      </div>
      <div>
        <div className={styles.block}>
          <p className={styles.name}>Позиция</p>
          <p className={styles.name}>Пользователь</p>
          <p className={styles.name}>Время</p>
        </div>
        {leaders.map(leader => (
          <div key={leader.id} className={styles.block}>
            <p className={styles.name}>{leaders.indexOf(leader) + 1}</p>
            <p className={styles.name}>{leader.name}</p>
            <p className={styles.name}>{leader.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
