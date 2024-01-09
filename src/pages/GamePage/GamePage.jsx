import { useParams } from "react-router-dom";

import { Cards } from "../../components/Cards/Cards";
import { ErrorCounter } from "../../components/ErrorCounter/ErrorCounter";
import { useSelector } from "react-redux";

export function GamePage() {
  const { pairsCount } = useParams();
  const isActiveGameMode = useSelector(state => state.game.isActiveGameMode);

  return (
    <>
      <Cards pairsCount={parseInt(pairsCount, 10)} previewSeconds={5}></Cards>
      {isActiveGameMode && <ErrorCounter />}
    </>
  );
}
