import { useSelector } from "react-redux";
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.scss";

const BurgerConstructor = (props) => {
  const bunSelect = useSelector((store) => store.burgerReducer.bunSelect);
  const fillingSelect = useSelector((store) => store.burgerReducer.fillingSelect);

  const openPopup = () => {
    props.setNewOrder(!props.newOrder);
  };

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
      <div className={`${styles.purchase} pr-4 mt-10`}>
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
  newOrder: PropTypes.bool.isRequired,
  setNewOrder: PropTypes.func.isRequired,
};

export default BurgerConstructor;
