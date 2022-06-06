import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor.jsx";
import Modal from "../../components/modal/modal.jsx";
import OrderDetails from "../../components/order-details/order-details.jsx";
import Preloader from "../../components/preloader/preloader.jsx";
import styles from "./main.module.scss";
import { getOrder } from "../../services/actions/order.js";

const Main = () => {
  const [newOrder, setNewOrder] = useState(false);
  const [visibleOrder, setVisibleOrder] = useState(false);
  const isInitialMount = useRef(true);

  const dispatch = useDispatch();
  const burderData = useSelector((store) => store.burgerReducer);
  const orderData = useSelector((store) => store.orderReducer);

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
      dispatch(getOrder(burderData));
      setVisibleOrder(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newOrder]);

  return (
    <>
      <main className={styles.content}>
        {burderData.isLoading && <Preloader type={"preloader"} />}
        {burderData.hasError && <Preloader type={"error"} />}
        {!burderData.isLoading && !burderData.hasError && burderData.ingredientsData.length && (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor newOrder={newOrder} setNewOrder={setNewOrder} />
          </DndProvider>
        )}
      </main>

      {visibleOrder && !orderData.isLoading && (
        <Modal closePopup={closePopup}>
          {orderData.hasError && <Preloader type={"error"} />}
          {!orderData.hasError && <OrderDetails orderNumber={orderData.orderData} />}
        </Modal>
      )}
    </>
  );
};

export default Main;
