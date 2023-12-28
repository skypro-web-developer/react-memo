import React, { useEffect, useRef, useState } from "react";
import styles from "./Leader.module.css"
import { useClose } from "../../hoock/useClose";



function Leader({name, time, position, achievements, setContextMenu, contextMenu}) {
  const [hard] = useState(achievements?.includes(1))
  const [magic] = useState(achievements?.includes(2))
  const navRef = useRef(null)
  useClose(navRef, () => {
    setContextMenu(null)
  })
  const minutes = Math.floor(time/60)
  const seconds = time % 60
  const validTime = [
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0')
  ].join(':');

  return (
    <div className={styles.leader}>
      <p className={styles.position}>#{position}</p>
      <p className={styles.name}>{name}</p>
      <div className={styles.box} onClick={(e) => {
        e.stopPropagation()
        contextMenu === position ? "" : setContextMenu(position)
      }} ref={navRef}>
        {contextMenu === position && <div className={styles.popup}>Игра пройдена без супер-сил</div>}
        {hard ? <img src="./hard.svg" alt="hard achievements" /> : <img src="./no-hard.svg" alt="hard achievements" /> }
        {magic ? <img src="./magic.svg" alt="magic achievements" /> : <img src="./no-magic.svg" alt="magic achievements" /> }
      </div>
      <p className={styles.time}>{validTime}</p>
    </div>
  );
}

export default Leader;