import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import OrderInfo from "../../components/order-info/order-info";
import Preloader from "../../components/preloader/preloader";
import styles from "./feed-details.module.scss";
import { FC, useEffect } from "react";
import { wsConnectionClosed, wsConnectionStart } from "../../services/actions/webSocket";
import { wsConnectionClosedAuth, wsConnectionStartAuth } from "../../services/actions/webSocketAuth";

interface FeedDetailsProps {
  wsAuth: boolean;
}

const FeedDetails: FC<FeedDetailsProps> = (props) => {
  const { wsAuth } = props;
  const burderData = useSelector((store: any) => store.burger);
  const feedData = useSelector((store: any) => store.ws);
  const feedDataAuth = useSelector((store: any) => store.wsAuth);
  const dispatch = useDispatch();
  const data = wsAuth ? feedDataAuth : feedData;

  useEffect((): (() => void) => {
    dispatch(wsAuth ? wsConnectionStartAuth() : wsConnectionStart());

    return () => dispatch(wsAuth ? wsConnectionClosedAuth() : wsConnectionClosed());

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

FeedDetails.propTypes = {
  wsAuth: PropTypes.bool.isRequired,
};

export default FeedDetails;
