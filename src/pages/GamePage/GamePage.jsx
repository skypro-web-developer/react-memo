import { useParams } from "react-router-dom";

import { Cards } from "../../components/Cards/Cards";
import { useDispatch, useSelector } from "react-redux";
import { ErrorCounter } from "../../components/ErrorCounter/ErrorCounter";
import { useEffect } from "react";
import { getLeaders } from "../../api";
import { setLeaders } from "../../store/slices";

export function GamePage() {
  const dispatch = useDispatch();
  const { pairsCount } = useParams();

  const isActiveEasyMode = useSelector(state => state.game.isActiveEasyMode);

  useEffect(() => {
    getLeaders().then(leaders => dispatch(setLeaders(leaders)));
  }, [dispatch]);

  return (
    <>
      <Cards pairsCount={parseInt(pairsCount, 10)} previewSeconds={5}></Cards>
      {isActiveEasyMode && <ErrorCounter />}
    </>
  );
}
