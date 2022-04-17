import { useContext } from "react";
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsContext } from "../../services/appContext.js";
import PropTypes from "prop-types";
import ingredientsPropTypes from "../../utils/types.js";
import styles from "./burger-constructor.module.scss";

const BurgerConstructor = (props) => {
  const ingredients = useContext(IngredientsContext);

  const openPopup = () => {
    props.setVisible(true);
  };

  const random = (select, amount) => {
    const newArr = [];

    for (let i = 0; i < amount; i++) {
      let a = Math.floor(Math.random() * select.length);
      newArr.push(select[a]);
    }

    return newArr;
  };

  const fillingSelect = random(
    ingredients.filter((item) => item.type !== "bun"),
    5
  );
  const bunSelect = random(
    ingredients.filter((item) => item.type === "bun"),
    1
  )[0];

  const calcCost = (bunSelect, fillingSelect) => {
    const bunCost = bunSelect.price * 2;
    const fillingCost = fillingSelect.reduce((previousValue, currentValue) => previousValue + currentValue.price, 0);

    return bunCost + fillingCost;
  };

  return (
    <section className={`${styles.burgerConstructor} mt-25`}>
      <div className={styles.elements}>
        <div className={`${styles.ingredientElement} ml-2`}>
          <ConstructorElement type="top" isLocked={true} text={`${bunSelect.name} (верх)`} price={bunSelect.price} thumbnail={bunSelect.image} />
        </div>
        <ul className={`${styles.ingredientsList} pr-2`}>{ingredientsList(fillingSelect)}</ul>
        <div className={`${styles.ingredientElement} ml-2`}>
          <ConstructorElement type="bottom" isLocked={true} text={`${bunSelect.name} (низ)`} price={bunSelect.price} thumbnail={bunSelect.image} />
        </div>
      </div>
      <div className={`${styles.purchase} mt-10`}>
        <div className={`${styles.totalCost} mr-10`}>
          <p className="text text_type_digits-medium mr-2">{calcCost(bunSelect, fillingSelect)}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium" onClick={openPopup}>
          <p className="text text_type_main-default">Оформить заказ</p>
        </Button>
      </div>
    </section>
  );
};

const ingredientsList = (ingredients) => {
  return (
    <>
      {ingredients.map((ingredient) => (
        <li className={styles.ingredientsItem} key={ingredient._id}>
          <div className={"mr-2"}>
            <DragIcon type="primary" />
          </div>
          <ConstructorElement isLocked={false} text={ingredient.name} price={ingredient.price} thumbnail={ingredient.image} />
        </li>
      ))}
    </>
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired),
};

export default BurgerConstructor;
