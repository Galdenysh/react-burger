import { useState, useContext } from "react";
import { Tab, Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsContext } from "../../services/appContext.js";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.scss";

const BurgerIngredients = (props) => {
  const [current, setCurrent] = useState("bun");
  const ingredients = useContext(IngredientsContext).ingredients;

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
          ingredients.filter((item) => item.type === "bun"), // Получаем массив с булками
          "Булки",
          props
        )}

        {ingredientsList(
          ingredients.filter((item) => item.type === "sauce"), // Получаем массив с соусами
          "Соусы",
          props
        )}

        {ingredientsList(
          ingredients.filter((item) => item.type === "main"), // Получаем массив с начинками
          "Начинки",
          props
        )}
      </div>
    </section>
  );
};

const ingredientsList = (ingredients, name, props) => {
  const openPopup = (id) => {
    props.setVisible(true);
    props.setIngredientId(id);
  };

  return (
    <ul className={styles.ingredientsWrap} key={name}>
      <h2 className={`text text_type_main-medium mt-10`}>{name}</h2>
      <ul className={`${styles.ingredientsList} mt-6`}>
        {ingredients.map((ingredient, count) => (
          <li className={`${styles.ingredientsItem}`} key={ingredient._id} onClick={() => openPopup(ingredient._id)}>
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
  setIngredientId: PropTypes.func.isRequired,
};

export default BurgerIngredients;
