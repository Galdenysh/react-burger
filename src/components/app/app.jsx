import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import Modal from "../modal/modal.jsx";
import OrderDetails from "../order-details/order-details.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";
import styles from "./app.module.scss";
import { getIngredients, getOrder } from "../../services/actions/burger.js";

const App = () => {
  const [newOrder, setNewOrder] = useState(false);
  const [visibleOrder, setVisibleOrder] = useState(false);
  const [visibleIngredient, setVisibleIngredient] = useState(false);
  const isInitialMount = useRef(true);

  const dispatch = useDispatch();
  const data = useSelector((store) => store.burgerReducer);

  useEffect(() => {
    dispatch(getIngredients());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      dispatch(getOrder(data));
      setVisibleOrder(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newOrder]);

  return (
    <>
      <AppHeader />
      <main className={styles.content}>
        {data.isLoading && <p className={`${styles.download} text text_type_main-large`}>Загрузка...</p>}
        {data.hasError && <p className={`${styles.download} text text_type_main-large`}>Произошла ошибка...</p>}
        {!data.isLoading && !data.hasError && data.ingredientsData.length && (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients setVisible={setVisibleIngredient} />
            <BurgerConstructor newOrder={newOrder} setNewOrder={setNewOrder} />
          </DndProvider>
        )}
      </main>

      {visibleOrder && !data.isLoading && !data.hasError && (
        <Modal setVisible={setVisibleOrder}>
          <OrderDetails orderNumber={data.orderData} />
        </Modal>
      )}
      {visibleIngredient && (
        <Modal setVisible={setVisibleIngredient}>
          <IngredientDetails ingredient={data.ingredientSelect} />
        </Modal>
      )}
    </>
  );
};

export default App;
