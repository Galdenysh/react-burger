import { useEffect, useState, useRef, FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import Modal from "../../components/modal/modal";
import OrderDetails from "../../components/order-details/order-details";
import Preloader from "../../components/preloader/preloader";
import styles from "./main.module.scss";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { fetchOrder } from "../../services/actions/order";

const Main: FC = () => {
  const [toggleOrder, setToggleOrder] = useState(false);
  const [visibleOrder, setVisibleOrder] = useState(false);
  const isInitialMount = useRef(true);

  const dispatch = useTypedDispatch();
  const burderData = useTypedSelector((store) => store.burger);
  const orderData = useTypedSelector((store) => store.order);

  const closePopup = () => {
    setVisibleOrder(false);
  };

  // при использования React.StrictMode надо выполнить код
  // useEffect(() => {
  //   return () => {
  //     isInitialMount.current = true;
  //   };
  // }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      dispatch(fetchOrder(burderData));
      setVisibleOrder(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleOrder]);

  return (
    <>
      {burderData.isLoading && <Preloader type={"preloader"} />}
      {burderData.hasError && <Preloader type={"error"} />}
      {!burderData.isLoading && !burderData.hasError && burderData.ingredientsData.length && (
        <main className={styles.content}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor toggleOrder={toggleOrder} setToggleOrder={setToggleOrder} />
          </DndProvider>
        </main>
      )}

      {visibleOrder && !orderData.isLoading && (
        <Modal closePopup={closePopup}>
          {orderData.hasError && <Preloader type={"error"} style={{ minHeight: "718px" }} />}
          {!orderData.hasError && <OrderDetails orderNumber={orderData.orderData} />}
        </Modal>
      )}
    </>
  );
};

export default Main;
