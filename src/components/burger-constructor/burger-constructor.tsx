import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import DropTargetIngredients from "./drop-target-ingredients";
import styles from "./burger-constructor.module.scss";
import { calcCost } from "../../utils/funcs";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface BurgerConstructorProps {
  toggleOrder: boolean;
  setToggleOrder: (toggleOrder: boolean) => void;
}

const BurgerConstructor: FC<BurgerConstructorProps> = (props) => {
  const { toggleOrder, setToggleOrder } = props;
  const bunSelect = useTypedSelector((store) => store.burger.bunSelect);
  const fillingSelect = useTypedSelector((store) => store.burger.fillingSelect);
  const orderData = useTypedSelector((store) => store.order);
  const userData = useTypedSelector((store) => store.auth);
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
          disabled={orderData.isLoading || bunSelect === null}
        >
          {orderData.isLoading ? "Идет загрузка..." : "Оформить заказ"}
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
