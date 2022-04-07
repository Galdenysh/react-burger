import { ConstructorElement, DragIcon, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.scss";

const constructorPropTypes = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
});

const BurgerConstructor = (props) => {
  const bun = props.selectedElements.filter((item) => item.type === "bun");

  const cost = props.selectedElements.reduce((previousValue, currentValue) => previousValue + currentValue.price, 0);

  return (
    <section className={`${styles.burgerConstructor} mt-25`}>
      <div className={styles.elements}>
        <div className={`${styles.ingredientElement} ml-2`}>
          <ConstructorElement type="top" isLocked={true} text={`${bun[0].name} (верх)`} price={bun[0].price} thumbnail={bun[0].image} />
        </div>
        <ul className={`${styles.ingredientsList} pr-2`}>{ingredientsList(props.selectedElements.filter((item) => item.type !== "bun"))}</ul>
        <div className={`${styles.ingredientElement} ml-2`}>
          <ConstructorElement type="bottom" isLocked={true} text={`${bun[0].name} (низ)`} price={bun[0].price} thumbnail={bun[0].image} />
        </div>
      </div>
      <div className={`${styles.purchase} mt-10`}>
        <div className={`${styles.totalCost} mr-10`}>
          <p className="text text_type_digits-medium mr-2">{cost}</p>
          <CurrencyIcon type="primary" />
        </div>
        <button className={styles.buyBtn}>
          <span className="text text_type_main-default">Оформить заказ</span>
        </button>
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
  selectedElements: PropTypes.arrayOf(constructorPropTypes),
};

export default BurgerConstructor;
