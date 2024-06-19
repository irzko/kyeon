import styles from "./styles.module.css";
export default function Background() {
  return (
    <>
      <div className="bg-gray-900 h-full w-full fixed top-0 left-0 -z-10"></div>
      <div className={styles["star-field"]}>
        <div className={styles.layer}></div>
        <div className={styles.layer}></div>
        <div className={styles.layer}></div>
      </div>
    </>
  );
}
