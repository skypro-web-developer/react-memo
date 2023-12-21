import React from "react";
import styles from "./Leader.module.css"
function Leader({name, time, position}) {
  return (
    <div className={styles.leader}>
      <p>#{position}</p>
      <p>{name}</p>
      <p>{time}</p>
    </div>
  );
}

export default Leader;