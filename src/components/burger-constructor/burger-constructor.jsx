import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import DropTargetIngredients from "./drop-target-ingredients";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.scss";
import { ADD_BUN_INGREDIENT } from "../../services/actions/burger";

const BurgerConstructor = (props) => {
  const bunSelect = useSelector((store) => store.burgerReducer.bunSelect);
  const fillingSelect = useSelector((store) => store.burgerReducer.fillingSelect);
  const orderData = useSelector((store) => store.orderReducer);
  const userData = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: ADD_BUN_INGREDIENT, payload: bunSelect });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openPopup = () => {
    props.setNewOrder(!props.newOrder);
  };

  const redirection = () => {
    navigate("/login");
  };

  const calcCost = (bunSelect, fillingSelect) => {
    const bunCost = bunSelect.price * 2;
    const fillingCost = fillingSelect.reduce((previousValue, currentValue) => previousValue + currentValue.price, 0);

    return bunCost + fillingCost;
  };

  return (
    <section className={`${styles.burgerConstructor} pt-25`}>
      <DropTargetIngredients bunSelect={bunSelect} fillingSelect={fillingSelect} />
      <div className={`${styles.purchase} pr-4 mt-10`}>
        <div className={`${styles.totalCost} mr-10`}>
          <p className="text text_type_digits-medium mr-2">{calcCost(bunSelect, fillingSelect)}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium" onClick={userData.loggedIn ? openPopup : redirection} disabled={orderData.isLoading}>
          {orderData.isLoading ? "Идет загрузка..." : "Оформить заказ"}
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
