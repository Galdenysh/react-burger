import { useEffect, useState, useRef } from "react";
import { api } from "../api/api.js";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import Modal from "../modal/modal.jsx";
import OrderDetails from "../order-details/order-details.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";
import { IngredientsContext } from "../../services/appContext.js";
import styles from "./app.module.scss";

const random = (select, amount) => {
  const newArr = [];

  for (let i = 0; i < amount; i++) {
    let a = Math.floor(Math.random() * select.length);
    newArr.push(select[a]);
  }

  return newArr;
};

const App = () => {
  const [ingredients, setIngredients] = useState({
    isLoading: false,
    hasError: false,
    data: [],
    bunSelect: {},
    fillingSelect: [],
  });
  const [ingredientId, setIngredientId] = useState();
  const [orderNumber, setOrderNumber] = useState({ isLoading: false, hasError: false, data: parseInt("0000") });
  const [newOrder, setNewOrder] = useState(false);
  const [visibleOrder, setVisibleOrder] = useState(false);
  const [visibleIngredient, setVisibleIngredient] = useState(false);
  const [visibleError, setVisibleError] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    setIngredients({ ...ingredients, hasError: false, isLoading: true });

    api
      .getIngredients()
      .then((ingredients) =>
        setIngredients({
          ...ingredients,
          data: ingredients.data,
          bunSelect: random(
            ingredients.data.filter((item) => item.type === "bun"),
            1
          )[0],
          fillingSelect: random(
            ingredients.data.filter((item) => item.type !== "bun"),
            5
          ),
          isLoading: false,
        })
      )
      .catch((err) => {
        setIngredients({ ...ingredients, hasError: true, isLoading: false });
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setOrderNumber({ ...orderNumber, hasError: false, isLoading: true });
      setVisibleOrder(true);

      api
        .sendOrder([...ingredients.fillingSelect, ingredients.bunSelect].map((item) => item._id))
        .then((res) => setOrderNumber({ ...orderNumber, isLoading: false, data: res.order.number }))
        .catch((err) => {
          setOrderNumber({ ...orderNumber, hasError: true, isLoading: false });
          setVisibleError(true);
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newOrder]);

  return (
    <>
      <AppHeader />
      <main className={styles.content}>
        {ingredients.isLoading && <p className={`${styles.download} text text_type_main-large`}>Загрузка...</p>}
        {ingredients.hasError && <p className={`${styles.download} text text_type_main-large`}>Произошла ошибка...</p>}
        {!ingredients.isLoading && !ingredients.hasError && ingredients.data.length && (
          <IngredientsContext.Provider value={{ ingredients: ingredients.data, bunSelect: ingredients.bunSelect, fillingSelect: ingredients.fillingSelect }}>
            <BurgerIngredients setVisible={setVisibleIngredient} setIngredientId={setIngredientId} />
            <BurgerConstructor newOrder={newOrder} setNewOrder={setNewOrder} />
          </IngredientsContext.Provider>
        )}
      </main>

      {visibleOrder && !orderNumber.isLoading && !orderNumber.hasError && (
        <Modal setVisible={setVisibleOrder}>
          <OrderDetails orderNumber={orderNumber.data} />
        </Modal>
      )}
      {visibleIngredient && (
        <Modal setVisible={setVisibleIngredient}>
          <IngredientDetails ingredient={ingredients.data.find((ingredient) => ingredient._id === ingredientId)} />
        </Modal>
      )}
      {visibleError && (
        <Modal setVisible={setVisibleError}>
          <p className={`${styles.download} text text_type_main-large`}>Произошла ошибка...</p>
        </Modal>
      )}
    </>
  );
};

export default App;
