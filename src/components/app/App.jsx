import React, { useEffect } from "react";
import Api from "../api/api.js";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import Modal from "../modal/modal.jsx";
import OrderDetails from "../order-details/order-details.jsx";
import { selectedElements } from "../../utils/data.js";
import styles from "./App.module.scss";

const api = new Api({ baseUrl: "https://norma.nomoreparties.space/api" });

const App = () => {
  const [ingredients, setIngredients] = React.useState([]);
  const [visible, setVisible] = React.useState(false);

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
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor selectedElements={selectedElements} setVisible={setVisible} />
      </main>
      {visible && (
        <Modal setVisible={setVisible}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

export default App;
