import { useSelector } from "react-redux";
import CardOrder from "../../components/card-order/card-order";
import OrderBoard from "../../components/order-board/order-board";
import Preloader from "../../components/preloader/preloader";
import styles from "./feed.module.scss";
import { feeds } from "../../utils/feeds";

const Feed = () => {
  const burderData = useSelector((store) => store.burgerReducer);

  return (
    <>
      {burderData.isLoading && <Preloader type={"preloader"} />}
      {burderData.hasError && <Preloader type={"error"} />}
      {!burderData.isLoading && !burderData.hasError && burderData.ingredientsData.length && (
        <main className={styles.content}>
          <section className={`${styles.cardsOrder} mr-15`}>
            <h1 className="text text_type_main-large">Лента заказов</h1>
            <ul className={`${styles.feedsList} pr-2`}>
              {feeds.orders.map((order) => (
                <CardOrder order={order} key={order._id} />
              ))}
            </ul>
          </section>
          <OrderBoard />
        </main>
      )}
    </>
  );
};

export default Feed;
