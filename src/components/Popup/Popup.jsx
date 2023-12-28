import React from "react";
import styles from "./Popup.module.css"
function Popup({children, style}) {
  return (
    <div className={styles.popup} style={style}>
      {children}
    </div>
  );
}

export default Popup;