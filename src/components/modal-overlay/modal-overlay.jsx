import styles from "./modal-overlay.module.scss";

const ModalOverlay = (props) => {
  return <div className={styles.overlay} onClick={props.closePopup}></div>;
};

export default ModalOverlay;
