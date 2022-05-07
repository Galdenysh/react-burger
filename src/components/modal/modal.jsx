import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { REMOVE_INFO_INGREDIENT } from "../../services/actions/burger";
import styles from "./modal.module.scss";

const modalRoot = document.getElementById("react-modals");

const Modal = (props) => {
  const dispatch = useDispatch();

  const closePopup = () => {
    props.setVisible(false);
    dispatch({ type: REMOVE_INFO_INGREDIENT });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  children: PropTypes.array.isRequired,
  setVisible: PropTypes.func.isRequired,
};

export default Modal;
