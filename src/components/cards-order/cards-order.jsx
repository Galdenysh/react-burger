import CardOrder from "./card-order";
import styles from "./cards-order.module.scss";
import { feeds } from "../../utils/feeds";

const CardsOrder = (props) => {
  const { style } = props;

  return (
    <section className={`${styles.cardsOrder} mr-15`} style={style}>
      <ul className={`${styles.feedsList} pr-2`}>
        {feeds.orders.map((order) => (
          <CardOrder order={order} key={order._id} />
        ))}
      </ul>
    </section>
  );
};

export default CardsOrder;
