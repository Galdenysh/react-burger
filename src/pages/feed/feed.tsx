import { useEffect, FC } from "react";
import CardsOrder from "../../components/cards-order/cards-order";
import OrderBoard from "../../components/order-board/order-board";
import Preloader from "../../components/preloader/preloader";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import styles from "./feed.module.scss";

const Feed: FC = () => {
  const burderData = useTypedSelector((store) => store.burger);
  const feedData = useTypedSelector((store) => store.ws);
  const { wsConnectionStart, wsConnectionClosed } = useActions();

  useEffect((): (() => void) => {
    wsConnectionStart();

    return () => wsConnectionClosed();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {(!feedData.wsConnected || burderData.isLoading || !feedData.messages.length) && <Preloader type={"preloader"} />}
      {(feedData.error || burderData.hasError) && <Preloader type={"error"} />}
      {feedData.wsConnected &&
        !feedData.error &&
        !!feedData.messages.length &&
        !burderData.isLoading &&
        !burderData.hasError &&
        !!burderData.ingredientsData.length && (
          <main className={styles.content}>
            <section className={styles.container}>
              <h1 className={`${styles.title} text text_type_main-large`}>Лента заказов</h1>
              <CardsOrder wsAuth={false} />
            </section>
            <OrderBoard />
          </main>
        )}
    </>
  );
};

export default Feed;
