import React from 'react';
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import { ingredients } from "../../utils/data.js";

const App = () => {
  return (
    <>
      <AppHeader />
      <BurgerIngredients ingredients={ingredients} />
      {/* <BurgerConstructor /> */}
    </>
  );
};

export default App;
