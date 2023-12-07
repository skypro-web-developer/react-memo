import { useParams } from "react-router-dom";

import { Cards } from "../../components/Cards/Cards";

export function GamePage() {
  const { pairsCountAndLiveMode } = useParams();

  const arrPairsCountAndLiveMode = pairsCountAndLiveMode.split("_");
  const pairsCount = arrPairsCountAndLiveMode.at(0);
  const myMode = (arrPairsCountAndLiveMode.at(1) === 'true')


  return (
    <>
      <Cards pairsCount={parseInt(pairsCount, 10)} previewSeconds={5} mode={myMode}></Cards>
    </>
  );
}
