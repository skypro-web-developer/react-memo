import { useState } from "react";
import styles from "./Superpowers.module.css";
import { Epiphany } from "./icons/EpiphanyIcon";
import { Alohomora } from "./icons/AlohomoraIcon";

export function Superpowers() {
  const [isAvailable] = useState(true);

  return (
    <div className={styles.container}>
      <Epiphany isAvailable={isAvailable} />
      <Alohomora isAvailable={isAvailable} />
    </div>
  );
}
