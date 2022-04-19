import PropTypes from "prop-types";
import iconOk from "../../images/icon-ok.svg";
import styles from "./order-details.module.scss";

const OrderDetails = (props) => {
  return (
    <>
      <p className="text text_type_digits-large mt-30">{props.orderNumber}</p>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <img src={iconOk} alt="иконка успеха" className={`${styles.iconOk} mt-15`} />
      <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mt-2 mb-30">Дождитесь готовности на орбитальной станции</p>
    </>
  );
};

OrderDetails.propTypes = {
  orderNumber: PropTypes.number.isRequired,
};

export default OrderDetails;
