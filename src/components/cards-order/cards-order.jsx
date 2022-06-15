import CardOrder from "./card-order";
import styles from "./cards-order.module.scss";

const CardsOrder = (props) => {
  const { data, auth } = props;
  const orders = auth ? data.orders.sort((a, b) => (a.number < b.number ? 1 : -1)) : data.orders;

  return (
    <div className={styles.cardsOrder}>
      <ul className={`${styles.feedsList} pr-2`}>
        {orders.slice(0, 10).map((order) => (
          <CardOrder order={order} auth={auth} key={order._id} />
        ))}
      </ul>
    </div>
  );
};

export default CardsOrder;
