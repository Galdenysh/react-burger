import PropTypes from "prop-types";
import styles from "./modal-overlay.module.scss";

const ModalOverlay = (props) => {
  return <div className={styles.overlay} onClick={props.closePopup}></div>;
};

ModalOverlay.propTypes = {
  closePopup: PropTypes.func.isRequired,
};

export default ModalOverlay;
