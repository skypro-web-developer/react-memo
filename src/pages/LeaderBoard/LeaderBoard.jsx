import styles from "./LeaderBoard.module.css";
import { Button } from "../../components/Button/Button";
import { LeaderBoardItem } from "../../components/LeaderBoardItem/LeaderBoardItem";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getLeaders } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { setLeaders } from "../../store/slices";

export function LeaderBoard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let position = 1;
  const leaders = useSelector(state => state.game.leaders);

  useEffect(() => {
    getLeaders().then(leaders => dispatch(setLeaders(leaders)));
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <h1 className={styles.heading}>Лидерборд</h1>
          <Button children={"Начать игру"} onClick={() => navigate("/")} />
        </div>
        <LeaderBoardItem isTemplate={true} />
        {leaders.map(leader => {
          return (
            <LeaderBoardItem
              key={leader.id}
              position={position++}
              user={leader.name}
              time={leader.time}
              isTemplate={false}
            />
          );
        })}
      </div>
    </div>
  );
}
