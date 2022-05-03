import { useSelector } from "react-redux";
import { CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import DropTargetIngredients from "./drop-target-ingredients";
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
        <DropTargetIngredients bunSelect={bunSelect} fillingSelect={fillingSelect}></DropTargetIngredients>
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

BurgerConstructor.propTypes = {
  newOrder: PropTypes.bool.isRequired,
  setNewOrder: PropTypes.func.isRequired,
};

export default BurgerConstructor;
