import { useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.scss";

const modalRoot = document.getElementById("react-modals");

const Modal = (props) => {
  const closePopup = () => {
    props.setVisible(false);
  };

  const closePopupEsc = (evt) => {
    if (evt.key === "Escape") {
      closePopup();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", closePopupEsc);

    return () => {
      document.removeEventListener("keydown", closePopupEsc);
    };
  }, []);

  return ReactDOM.createPortal(
    <section className={styles.popup}>
      <div className={styles.container}>
        {props.children}
        <div className={`${styles.closeBtn} mt-15 mr-10`} onClick={closePopup}>
          <CloseIcon type="primary" />
        </div>
      </div>
      <ModalOverlay closePopup={closePopup} />
    </section>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  setVisible: PropTypes.func.isRequired,
};

export default Modal;
