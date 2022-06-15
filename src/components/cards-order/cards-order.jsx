import { useSelector } from "react-redux";
import CardOrder from "./card-order";
import styles from "./cards-order.module.scss";

const CardsOrder = (props) => {
  const { style } = props;
  const feedData = useSelector((store) => store.webSocketReducer.messages[0]);

  return (
    <section className={`${styles.cardsOrder} mr-15`} style={style}>
      <ul className={`${styles.feedsList} pr-2`}>
        {feedData.orders.slice(0, 10).map((order) => (
          <CardOrder order={order} key={order._id} />
        ))}
      </ul>
    </section>
  );
};

export default CardsOrder;
