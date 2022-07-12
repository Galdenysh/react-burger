import OrderInfo from "../../components/order-info/order-info";
import Preloader from "../../components/preloader/preloader";
import styles from "./feed-details.module.scss";
import { FC, useEffect } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";

interface FeedDetailsProps {
  wsAuth: boolean;
}

const FeedDetails: FC<FeedDetailsProps> = (props) => {
  const { wsAuth } = props;
  const burderData = useTypedSelector((store) => store.burger);
  const feedData = useTypedSelector((store) => store.ws);
  const feedDataAuth = useTypedSelector((store) => store.wsAuth);
  const { wsConnectionStart, wsConnectionClosed, wsConnectionStartAuth, wsConnectionClosedAuth } = useActions();
  const data = wsAuth ? feedDataAuth : feedData;

  useEffect((): (() => void) => {
    wsAuth ? wsConnectionStartAuth() : wsConnectionStart();

    return () => (wsAuth ? wsConnectionClosedAuth() : wsConnectionClosed());

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
