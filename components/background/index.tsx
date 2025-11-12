import { Box } from "@chakra-ui/react";
import styles from "./styles.module.css";
export default function Background() {
  return (
    <>
      <Box
        position="fixed"
        top={0}
        left={0}
        width="100%"
        height="100%"
        zIndex={-10}
      ></Box>
      <div className={styles["star-field"]}>
        <div className={styles.layer}></div>
        <div className={styles.layer}></div>
        <div className={styles.layer}></div>
      </div>
    </>
  );
}
