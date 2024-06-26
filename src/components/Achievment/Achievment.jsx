import unsuper1 from "./unsuper1.svg";
import super1 from "./super1.svg";

export default function Achievment(isAchievment) {
  console.log(Object.values(isAchievment)[2].isAchievment);
  return (
    <>{Object.values(isAchievment)[2].isAchievment ? <img src={super1} alt="" /> : <img src={unsuper1} alt="" />}</>
  );
}
