import OrderInfo from "../../components/order-info/order-info";
import Preloader from "../../components/preloader/preloader";
import styles from "./feed-details.module.scss";
import { FC, useEffect } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { wsConnectionClosedAuth, wsConnectionStartAuth } from "../../services/actions/webSocketAuth";
import { wsConnectionClosed, wsConnectionStart } from "../../services/actions/webSocket";

interface FeedDetailsProps {
  wsAuth: boolean;
}

const FeedDetails: FC<FeedDetailsProps> = (props) => {
  const { wsAuth } = props;
  const burderData = useTypedSelector((store) => store.burger);
  const feedData = useTypedSelector((store) => store.ws);
  const feedDataAuth = useTypedSelector((store) => store.wsAuth);
  const dispatch = useTypedDispatch();
  const data = wsAuth ? feedDataAuth : feedData;

  useEffect((): (() => void) => {
    wsAuth ? dispatch(wsConnectionStartAuth()) : dispatch(wsConnectionStart());

    return () => (wsAuth ? dispatch(wsConnectionClosedAuth()) : dispatch(wsConnectionClosed()));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {(!data.wsConnected || burderData.isLoading) && <Preloader type={"preloader"} />}
      {(data.error || burderData.hasError) && <Preloader type={"error"} />}
      {data.wsConnected &&
        !data.error &&
        !!data.messages.length &&
        !burderData.isLoading &&
        !burderData.hasError &&
        !!burderData.ingredientsData.length && (
          <main className={styles.content}>
            <OrderInfo wsAuth={wsAuth} titleStyle={{ margin: "auto" }} />
          </main>
        )}
    </>
  );
};

export default FeedDetails;
