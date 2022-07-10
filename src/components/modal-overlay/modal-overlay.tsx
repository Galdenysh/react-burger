import { FC } from "react";
import styles from "./modal-overlay.module.scss";

interface IModalOverlayProps {
  closePopup: () => void;
}

const ModalOverlay: FC<IModalOverlayProps> = (props) => {
  const { closePopup } = props;
  return <div className={styles.overlay} onClick={closePopup}></div>;
};

export default ModalOverlay;
