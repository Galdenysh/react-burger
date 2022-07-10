import { FC } from "react";
import styles from "./modal-overlay.module.scss";

interface ModalOverlayProps {
  closePopup: () => void;
}

const ModalOverlay: FC<ModalOverlayProps> = (props) => {
  const { closePopup } = props;
  return <div className={styles.overlay} onClick={closePopup}></div>;
};

export default ModalOverlay;
