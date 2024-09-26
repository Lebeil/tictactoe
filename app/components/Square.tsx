import styles from "../../app/page.module.css";

interface valueProps {
  value: string | undefined;
  onSquareClick: () => void;
}

export function Square ({value, onSquareClick}:valueProps) {
  return <button className={styles.gridItem} onClick={onSquareClick}>{value}</button>
}


