import CardOrder from "./card-order";
import styles from "./cards-order.module.scss";

const CardsOrder = (props) => {
  const { style, data, auth } = props;
  const orders = auth ? data.orders.sort((a, b) => (a.number < b.number ? 1 : -1)) : data.orders;

  return (
    <section className={`${styles.cardsOrder} mr-15`} style={style}>
      <ul className={`${styles.feedsList} pr-2`}>
        {orders.slice(0, 10).map((order) => (
          <CardOrder order={order} auth={auth} key={order._id} />
        ))}
      </ul>
    </section>
  );
};

export default CardsOrder;
