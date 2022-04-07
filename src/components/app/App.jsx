import React, { useEffect } from "react";
import Api from "../Api/api.js";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import { selectedElements } from "../../utils/data.js";
import styles from "./App.module.scss";

const api = new Api({ baseUrl: "https://norma.nomoreparties.space/api" });

const App = () => {
  const [ingredients, setIngredients] = React.useState([]);

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
        <BurgerConstructor selectedElements={selectedElements} />
      </main>
    </>
  );
};

export default App;
