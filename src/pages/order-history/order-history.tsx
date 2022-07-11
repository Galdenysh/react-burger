import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardsOrder from "../../components/cards-order/cards-order";
import Preloader from "../../components/preloader/preloader";
import { wsConnectionClosedAuth, wsConnectionStartAuth } from "../../services/actions/webSocketAuth";
import styles from "./order-history.module.scss";

const OrderHistory: FC = () => {
  const burderData = useSelector((store: any) => store.burger);
  const feedData = useSelector((store: any) => store.wsAuth);
  const dispatch = useDispatch();

  useEffect((): (() => void) => {
    dispatch(wsConnectionStartAuth());

    return () => dispatch(wsConnectionClosedAuth());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {(!feedData.wsConnected || burderData.isLoading || !feedData.messages.length) && (
        <Preloader type={"preloader"} style={{ width: "480px", marginTop: "-160px" }} />
      )}
      {(feedData.error || burderData.hasError) && (
        <Preloader type={"error"} style={{ width: "480px", marginTop: "-160px" }} />
      )}
      {feedData.wsConnected &&
        !feedData.error &&
        !!feedData.messages.length &&
        !burderData.isLoading &&
        !burderData.hasError &&
        !!burderData.ingredientsData.length && (
          <section className={styles.container}>
            <CardsOrder wsAuth={true} />
          </section>
        )}
    </>
  );
};

export default OrderHistory;
