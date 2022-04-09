import React, { useEffect } from "react";
import Api from "../api/api.js";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import Modal from "../modal/modal.jsx";
import OrderDetails from "../order-details/order-details.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";
import { selectedElements } from "../../utils/data.js";
import styles from "./App.module.scss";

const api = new Api({ baseUrl: "https://norma.nomoreparties.space/api" });

const App = () => {
  const [ingredients, setIngredients] = React.useState([]);
  const [visibleOrder, setVisibleOrder] = React.useState(false);
  const [visibleIngredient, setVisibleIngredient] = React.useState(false);
  const [ingredientId, setIngredientId] = React.useState();

  useEffect(() => {
    api
      .getIngredients()
      .then((ingredients) => setIngredients(ingredients.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.content}>
        <BurgerIngredients ingredients={ingredients} setVisible={setVisibleIngredient} setIngredientId={setIngredientId} />
        <BurgerConstructor selectedElements={selectedElements} setVisible={setVisibleOrder} />
      </main>
      {visibleOrder && (
        <Modal setVisible={setVisibleOrder}>
          <OrderDetails />
        </Modal>
      )}
      {visibleIngredient && (
        <Modal setVisible={setVisibleIngredient}>
          <IngredientDetails ingredient={ingredients.find((ingredient) => ingredient._id === ingredientId)} />
        </Modal>
      )}
    </>
  );
};

export default App;
