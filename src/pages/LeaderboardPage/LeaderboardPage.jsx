import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import styles from "./LeaderboardPage.module.css";
import { useLeaders } from "../../context/hooks/useLeaders";
import ToolTipGame from "../../components/ToolTip/ToolTipGame";
import ToolTipSuper from "../../components/ToolTip/ToolTipSuper";

export function LeaderboardPage() {
  const { leaders, setLeaders } = useLeaders();
  setLeaders(leaders.sort((a, b) => +a.time - +b.time));
  let leadersAchievments = leaders.map(leader => leader.achievements);

  console.log(leadersAchievments);
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
          <div className={styles.grid}>
            <p className={styles.name}>Позиция</p>
          </div>
          <div className={styles.grid}>
            <p className={styles.name}>Пользователь</p>
          </div>
          <div className={styles.grid}>
            <div className={styles.name}>Достижения</div>
          </div>
          <div className={styles.grid}>
            <p className={styles.name}>Время</p>
          </div>
        </div>
        {leaders.map((leader, i) => (
          <div key={leader.id} className={styles.block}>
            <div className={styles.grid}>
              <p className={styles.name}>{leaders.indexOf(leader) + 1}</p>
            </div>
            <div className={styles.grid}>
              <p className={styles.name}>{leader.name}</p>
            </div>
            <div className={styles.grid}>
              <ToolTipGame isAchievment={leader.achievements.includes(1)} />
              <ToolTipSuper isAchievment={leader.achievements.includes(2)} />
            </div>
            <div className={styles.grid}>
              <p className={styles.name}>{leader.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
