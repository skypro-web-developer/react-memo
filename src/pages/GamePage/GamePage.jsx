import { useParams } from "react-router-dom";

import { Cards } from "../../components/Cards/Cards";
import { ErrorCounter } from "../../components/ErrorCounter/ErrorCounter";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getLeaders } from "../../api";
import { useDispatch } from "react-redux";
import { setLeaders } from "../../store/slices";
import { ToolTips } from "../../components/ToolTips/ToolTips";
import styles from "./GamePage.module.css";

export function GamePage() {
  const dispatch = useDispatch();
  const { pairsCount } = useParams();
  const isActiveEasyMode = useSelector(state => state.game.isActiveEasyMode);

  useEffect(() => {
    getLeaders().then(leaders => dispatch(setLeaders(leaders)));
  }, [dispatch]);

  // Доступно ли использование прозрения
  const [isEpiphanyAvailable, setIsEpiphanyAvailable] = useState(true);
  // Доступно ли использование алохоморы
  const [isAlohomoraAvailable, setIsAlohomoraAvailable] = useState(true);

  const [isEpiphanyMouseEnter, setIsEpiphanyMouseEnter] = useState(false);
  const [isAlohomoraMouseEnter, setIsAlohomoraMouseEnter] = useState(false);

  return (
    <>
      <Cards
        pairsCount={parseInt(pairsCount, 10)}
        previewSeconds={5}
        setIsEpiphanyAvailable={setIsEpiphanyAvailable}
        setIsAlohomoraAvailable={setIsAlohomoraAvailable}
        isEpiphanyAvailable={isEpiphanyAvailable}
        isAlohomoraAvailable={isAlohomoraAvailable}
        setIsEpiphanyMouseEnter={setIsEpiphanyMouseEnter}
        setIsAlohomoraMouseEnter={setIsAlohomoraMouseEnter}
      ></Cards>
      {isActiveEasyMode && <ErrorCounter />}
      {isEpiphanyMouseEnter && isEpiphanyAvailable ? (
        <div className={styles.toolTipEpiphany}>
          <ToolTips
            title={"Прозрение"}
            text={"На 5 секунд показываются все карты. Таймер длительности игры на это время останавливается."}
          />
        </div>
      ) : null}
      {isAlohomoraMouseEnter && isAlohomoraAvailable && (
        <div className={styles.toolTipAlohomora}>
          <ToolTips title={"Алохомора"} text={"Открывается случайная пара карт."} />
        </div>
      )}
    </>
  );
}
