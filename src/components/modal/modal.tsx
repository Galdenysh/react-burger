import { useEffect, FC, ReactNode } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.scss";

const modalRoot = document.getElementById("react-modals") as HTMLElement;

interface IModalProps {
  closePopup: () => void;
  children: ReactNode;
}

const Modal: FC<IModalProps> = (props) => {
  const { closePopup, children } = props;

  const closePopupEsc = (evt: KeyboardEvent) => {
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

export default Modal;
