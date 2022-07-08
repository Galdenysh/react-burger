import { FC } from "react";
import iconOk from "../../images/icon-ok.svg";
import styles from "./order-details.module.scss";

interface IOrderDetails {
  orderNumber: number;
}

const OrderDetails: FC<IOrderDetails> = (props) => {
  const { orderNumber } = props;

  return (
    <>
      <p className="text text_type_digits-large mt-30">{orderNumber}</p>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <img src={iconOk} alt="иконка успеха" className={`${styles.iconOk} mt-15`} />
      <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mt-2 mb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
};

export default OrderDetails;
