import Popup from "../Popup/Popup";
import styles from "./SuperItem.module.css";

function SuperItem({ popup, setPopup, id, text }) {
  const addPopup = () => {
    popup !== id ? setPopup(id) : setPopup(null)
  }

  return (
    <div
      className={styles.superItem}
      onMouseEnter={addPopup}
      onMouseLeave={addPopup}
    >
      {popup === id && <Popup style={{
        left: "5px",
        bottom: " 45px"
      }}>{text}</Popup>}
    </div>

  );
}

export default SuperItem;