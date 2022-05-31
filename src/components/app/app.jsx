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
import { getIngredients } from "../../services/actions/burger.js";
import { getOrder } from "../../services/actions/order.js";
import Login from "../../pages/login/login.jsx";
import Register from "../../pages/register/register.jsx";
import ForgotPassword from "../../pages/forgot-password/forgot-password.jsx";
import ForgotPasswordTwo from "../../pages/reset-password/reset-password.jsx";
import Profile from "../../pages/profile/profile.jsx";
import Ingredients from "../../pages/ingredients/ingredients.jsx";

const App = () => {
  const [newOrder, setNewOrder] = useState(false);
  const [visibleOrder, setVisibleOrder] = useState(false);
  const [visibleIngredient, setVisibleIngredient] = useState(false);
  const isInitialMount = useRef(true);

  const dispatch = useDispatch();
  const burderData = useSelector((store) => store.burgerReducer);
  const orderData = useSelector((store) => store.orderReducer);

  useEffect(() => {
    dispatch(getIngredients());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      dispatch(getOrder(burderData));
      setVisibleOrder(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newOrder]);

  // return (
  //   <>
  //     <AppHeader />
  //     <main className={styles.content}>
  //       {burderData.isLoading && <p className={`${styles.download} text text_type_main-large`}>Загрузка...</p>}
  //       {burderData.hasError && <p className={`${styles.download} text text_type_main-large`}>Произошла ошибка...</p>}
  //       {!burderData.isLoading && !burderData.hasError && burderData.ingredientsData.length && (
  //         <DndProvider backend={HTML5Backend}>
  //           <BurgerIngredients setVisible={setVisibleIngredient} />
  //           <BurgerConstructor newOrder={newOrder} setNewOrder={setNewOrder} />
  //         </DndProvider>
  //       )}
  //     </main>

  //     {visibleOrder && !orderData.isLoading && (
  //       <Modal setVisible={setVisibleOrder}>
  //         {orderData.hasError && <p className={`${styles.download} text text_type_main-large`}>Произошла ошибка...</p>}
  //         {!orderData.hasError && <OrderDetails orderNumber={orderData.orderData} />}
  //       </Modal>
  //     )}
  //     {visibleIngredient && (
  //       <Modal setVisible={setVisibleIngredient}>
  //         <IngredientDetails ingredient={burderData.ingredientSelect} />
  //       </Modal>
  //     )}
  //   </>
  // );

  return (
    <>
      <AppHeader />
      {/* <Login /> */}
      {/* <Register /> */}
      {/* <ForgotPassword /> */}
      {/* <ForgotPasswordTwo /> */}
      {/* <Profile /> */}
      <Ingredients ingredient={burderData.ingredientSelect} />
    </>
  );
};

export default App;
