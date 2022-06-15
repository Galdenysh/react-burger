import { useSelector } from "react-redux";
import CardsOrder from "../../components/cards-order/cards-order";
import OrderBoard from "../../components/order-board/order-board";
import Preloader from "../../components/preloader/preloader";
import styles from "./feed.module.scss";

const Feed = () => {
  const burderData = useSelector((store) => store.burgerReducer);
  const feedData = useSelector((store) => store.webSocketReducer);

  return (
    <>
      {!feedData.wsConnected && burderData.isLoading && !feedData.messages.length && <Preloader type={"preloader"} />}
      {feedData.error && burderData.hasError && <Preloader type={"error"} />}
      {feedData.wsConnected &&
        !feedData.error &&
        !!feedData.messages.length &&
        !burderData.isLoading &&
        !burderData.hasError &&
        !!burderData.ingredientsData.length && (
          <main className={styles.content}>
            <section className={styles.container}>
              <h1 className={`${styles.title} text text_type_main-large`}>Лента заказов</h1>
              <CardsOrder />
            </section>
            <OrderBoard />
          </main>
        )}
    </>
  );
};

export default Feed;
