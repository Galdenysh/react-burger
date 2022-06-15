import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import CardOrder from "./card-order";
import styles from "./cards-order.module.scss";

const CardsOrder = (props) => {
  const { wsAuth } = props;
  const feedData = useSelector((store) => store.webSocketReducer.messages[0]);
  const feedDataAuth = useSelector((store) => store.webSocketReducerAuth.messages[0]);
  const data = wsAuth ? feedDataAuth : feedData;
  const orders = wsAuth ? data.orders.sort((a, b) => (a.number < b.number ? 1 : -1)) : data.orders;

  return (
    <div className={styles.cardsOrder}>
      <ul className={`${styles.feedsList} pr-2`}>
        {orders.slice(0, 10).map((order) => (
          <CardOrder order={order} wsAuth={wsAuth} key={order._id} />
        ))}
      </ul>
    </div>
  );
};

CardsOrder.propTypes = {
  wsAuth: PropTypes.bool.isRequired,
};

export default CardsOrder;
