import styles from "./TextField.module.css";

export function TextField({ id, name, placeholder, value = "", onChange }) {
  return (
    <input
      type="text"
      className={styles.input}
      id={id}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}
