import React from 'react';
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import { ingredients, selectedElements } from "../../utils/data.js";
import styles from "./App.module.scss";

const App = () => {
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
