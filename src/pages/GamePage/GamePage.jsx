import { useParams } from "react-router-dom";

import { Cards } from "../../components/Cards/Cards";
import { ErrorCounter } from "../../components/ErrorCounter/ErrorCounter";
import { useSelector } from "react-redux";

export function GamePage() {
  const { pairsCount } = useParams();
  const isActiveEasyMode = useSelector(state => state.game.isActiveEasyMode);

  return (
    <>
      <Cards pairsCount={parseInt(pairsCount, 10)} previewSeconds={5}></Cards>
      {isActiveEasyMode && <ErrorCounter />}
    </>
  );
}
