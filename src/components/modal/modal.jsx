import { useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.scss";

const modalRoot = document.getElementById("react-modals");

const Modal = (props) => {
  const { closePopup, children } = props;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ReactDOM.createPortal(
    <section className={styles.popup}>
      <div className={styles.container}>
        {children}
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
  children: PropTypes.oneOfType([PropTypes.element.isRequired, PropTypes.array.isRequired]),
  closePopup: PropTypes.func.isRequired,
};

export default Modal;
