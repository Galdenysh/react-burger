import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ADD_INFO_INGREDIENT } from "../../services/actions/burger.js";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.scss";

const BurgerIngredients = (props) => {
  const [current, setCurrent] = useState("bun");
  const dispatch = useDispatch();
  const ingredientsData = useSelector((store) => store.burgerReducer.ingredientsData);

  return (
    <section className={`${styles.burgerIngredients} mt-10 mr-10`}>
      <h1 className={"text text_type_main-large"}>Собери бургер</h1>
      <div className={`${styles.tab} mt-5`}>
        <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={styles.container}>
        {ingredientsList(
          ingredientsData.filter((item) => item.type === "bun"), // Получаем массив с булками
          "Булки",
          props,
          dispatch
        )}

        {ingredientsList(
          ingredientsData.filter((item) => item.type === "sauce"), // Получаем массив с соусами
          "Соусы",
          props,
          dispatch
        )}

        {ingredientsList(
          ingredientsData.filter((item) => item.type === "main"), // Получаем массив с начинками
          "Начинки",
          props,
          dispatch
        )}
      </div>
    </section>
  );
};

const ingredientsList = (ingredients, name, props, dispatch) => {
  const openPopup = (ingredient) => {
    props.setVisible(true);
    dispatch({ type: ADD_INFO_INGREDIENT, payload: ingredient });
  };

  return (
    <ul className={styles.ingredientsWrap} key={name}>
      <h2 className={`text text_type_main-medium mt-10`}>{name}</h2>
      <ul className={`${styles.ingredientsList} mt-6`}>
        {ingredients.map((ingredient, count) => (
          <li className={`${styles.ingredientsItem}`} key={ingredient._id} onClick={() => openPopup(ingredient)}>
            {count > 0 && <Counter count={count} size="default" />}
            <img src={ingredient.image} alt={ingredient.name} />
            <div className={styles.price}>
              <p className="text text_type_digits-default mt-2 mr-2">{ingredient.price}</p>
              <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default mt-2">{ingredient.name}</p>
          </li>
        ))}
      </ul>
    </ul>
  );
};

BurgerIngredients.propTypes = {
  setVisible: PropTypes.func.isRequired,
};

export default BurgerIngredients;
