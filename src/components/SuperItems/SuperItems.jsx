import React, { useState } from "react";
import Popup from "../Popup/Popup";
import styles from "./SuperItems.module.css";
import superItem from "../SuperItem/SuperItem";
import SuperItem from "../SuperItem/SuperItem";

function SuperItems() {
  // всплывающее окно
  const [popup, setPopup] = useState(null);

  const superSill = [
    {
      id: 1,
      img: null,
      text: "Стан на 5 секунд"
    },
    {
      id: 2,
      img: null,
      text: "Вскрыть любую карту"
    }
  ];
  return (
    <div className={styles.superBox}>
      {superSill.map(superItemElement => {
        return <SuperItem
          key={superItemElement.id}
          id={superItemElement.id}
          img={superItemElement.img}
          text={superItemElement.text}
          popup={popup}
          setPopup={setPopup} />;
      })}
    </div>
  );
}

export default SuperItems;