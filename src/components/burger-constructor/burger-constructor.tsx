import { FC } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import DropTargetIngredients from "./drop-target-ingredients";
import styles from "./burger-constructor.module.scss";
import { calcCost } from "../../utils/funcs";

interface IBurgerConstructorProps {
  toggleOrder: boolean;
  setToggleOrder: (toggleOrder: boolean) => void;
}

const BurgerConstructor: FC<IBurgerConstructorProps> = (props) => {
  const { toggleOrder, setToggleOrder } = props;
  const bunSelect = useSelector((store: any) => store.burgerReducer.bunSelect);
  const fillingSelect = useSelector((store: any) => store.burgerReducer.fillingSelect);
  const orderData = useSelector((store: any) => store.orderReducer);
  const userData = useSelector((store: any) => store.authReducer);
  const navigate = useNavigate();

  const openPopup = () => {
    setToggleOrder(!toggleOrder);
  };

  const redirection = () => {
    navigate("/login");
  };

  return (
    <section className={`${styles.burgerConstructor} pt-25`}>
      <DropTargetIngredients bunSelect={bunSelect} fillingSelect={fillingSelect} />
      <div className={`${styles.purchase} pr-4 mt-10`}>
        <div className={`${styles.totalCost} mr-10`}>
          <p className="text text_type_digits-medium mr-2">{calcCost(bunSelect, fillingSelect)}</p>
          <CurrencyIcon type="primary" />
        </div>
        {/* @ts-ignore */}
        <Button
          type="primary"
          size="medium"
          onClick={userData.loggedIn ? openPopup : redirection}
          disabled={orderData.isLoading || Object.keys(bunSelect).length === 0}
        >
          {orderData.isLoading ? "Идет загрузка..." : "Оформить заказ"}
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
