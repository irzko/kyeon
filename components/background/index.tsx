import styles from "./styles.module.css";
export default function Background() {
  return (
    <>
      <div className={styles.bg}></div>
      <div className={styles["star-field"]}>
        <div className={styles.layer}></div>
        <div className={styles.layer}></div>
        <div className={styles.layer}></div>
      </div>
    </>
  );
}
