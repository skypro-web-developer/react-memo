import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import styles from "./LeaderboardPage.module.css";

export function LeaderboardPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.text}>Лидерборд</p>
        <Link to="/game/9">
          <Button>Начать игру</Button>
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Позиция</th>
            <th>Пользователь</th>
            <th>Время</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>affa</td>
            <td>1fff</td>
            <td>1w</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
