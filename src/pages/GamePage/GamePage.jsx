import { useLocation, useParams } from "react-router-dom";

import { Cards } from "../../components/Cards/Cards";

export function GamePage() {
  const { pairsCount } = useParams();
  const { state: isEasyMode } = useLocation();

  return (
    <>
      <Cards pairsCount={parseInt(pairsCount, 10)} previewSeconds={5} isEasyMode={isEasyMode}></Cards>
    </>
  );
}
