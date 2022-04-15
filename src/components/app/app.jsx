import { useEffect, useState } from "react";
import Api from "../api/api.js";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import Modal from "../modal/modal.jsx";
import OrderDetails from "../order-details/order-details.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";
import { IngredientsContext } from "../../services/appContext.js";
import styles from "./app.module.scss";

const api = new Api({ baseUrl: "https://norma.nomoreparties.space/api" });

const App = () => {
  const [ingredients, setIngredients] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  });
  const [visibleOrder, setVisibleOrder] = useState(false);
  const [visibleIngredient, setVisibleIngredient] = useState(false);
  const [ingredientId, setIngredientId] = useState();
  const orderNumber = "034536";

  useEffect(() => {
    setIngredients({ ...ingredients, hasError: false, isLoading: true });

    api
      .getIngredients()
      .then((ingredients) => setIngredients({ ...ingredients, data: ingredients.data, isLoading: false }))
      .catch((err) => {
        setIngredientId({ ...ingredients, hasError: true, isLoading: false });
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.content}>
        <IngredientsContext.Provider value={ingredients.data}>
          {ingredients.isLoading && <p className={`${styles.download} text text_type_main-large`}>Загрузка...</p>}
          {ingredients.hasError && <p className={`${styles.download} text text_type_main-large`}>Произошла ошибка...</p>}
          {!ingredients.isLoading && !ingredients.hasError && ingredients.data.length && (
            <>
              <BurgerIngredients setVisible={setVisibleIngredient} setIngredientId={setIngredientId} />
              <BurgerConstructor setVisible={setVisibleOrder} />
            </>
          )}
        </IngredientsContext.Provider>
      </main>

      {visibleOrder && (
        <Modal setVisible={setVisibleOrder}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
      {visibleIngredient && (
        <Modal setVisible={setVisibleIngredient}>
          <IngredientDetails ingredient={ingredients.data.find((ingredient) => ingredient._id === ingredientId)} />
        </Modal>
      )}
    </>
  );
};

export default App;
