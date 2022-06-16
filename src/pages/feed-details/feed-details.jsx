import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import OrderInfo from "../../components/order-info/order-info";
import Preloader from "../../components/preloader/preloader";
import styles from "./feed-details.module.scss";
import { useEffect } from "react";
import { wsConnectionClosed, wsConnectionStart } from "../../services/actions/webSocket";
import { wsConnectionClosedAuth, wsConnectionStartAuth } from "../../services/actions/webSocketAuth";

const FeedDetails = (props) => {
  const { wsAuth } = props;
  const burderData = useSelector((store) => store.burgerReducer);
  const feedData = useSelector((store) => store.webSocketReducer);
  const feedDataAuth = useSelector((store) => store.webSocketReducerAuth);
  const dispatch = useDispatch();
  const data = wsAuth ? feedDataAuth : feedData;

  useEffect(() => {
    dispatch(wsAuth ? wsConnectionStartAuth() : wsConnectionStart());

    return () => dispatch(wsAuth ? wsConnectionClosedAuth() : wsConnectionClosed());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!data.wsConnected && burderData.isLoading && <Preloader type={"preloader"} />}
      {data.error && burderData.hasError && <Preloader type={"error"} />}
      {data.wsConnected && !data.error && !!data.messages.length && !burderData.isLoading && !burderData.hasError && !!burderData.ingredientsData.length && (
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
