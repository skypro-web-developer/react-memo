import { useRef, useState } from "react";
import styles from "./ToolTip.module.css";

import unsuper2 from "./unsuper2.svg";
import super2 from "./super2.svg";

export default function ToolTipSuper(isAchievment) {
  const [showToolTip, setShowToolTip] = useState(false);
  const refSetTimeout = useRef();

  const onMouseEnterHandler = () => {
    refSetTimeout.current = setTimeout(() => {
      setShowToolTip(true);
    }, 750);
    console.log(isAchievment);
  };

  const onMouseLeaveHandler = () => {
    clearTimeout(refSetTimeout.current);
    setShowToolTip(false);
  };

  return (
    <>
      {Object.values(isAchievment)[0] ? (
        <>
          <img onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler} src={super2} alt="" />
          {showToolTip && <div className={styles.toolTip}> Игра пройдена без супер сил </div>}
        </>
      ) : (
        <>
          <img onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler} src={unsuper2} alt="" />
          {showToolTip && <div className={styles.toolTip}> Игра пройдена без супер сил </div>}
        </>
      )}
    </>
  );
}
