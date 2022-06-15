import { useSelector } from "react-redux";
import OrderInfo from "../../components/order-info/order-info";
import Preloader from "../../components/preloader/preloader";
import styles from "./feed-details.module.scss";

const FeedDetails = () => {
  const burderData = useSelector((store) => store.burgerReducer);
  const feedData = useSelector((store) => store.webSocketReducer);

  return (
    <>
      {!feedData.wsConnected && burderData.isLoading && <Preloader type={"preloader"} />}
      {feedData.error && burderData.hasError && <Preloader type={"error"} />}
      {feedData.wsConnected &&
        !feedData.error &&
        !!feedData.messages.length &&
        !burderData.isLoading &&
        !burderData.hasError &&
        !!burderData.ingredientsData.length && (
          <main className={styles.content}>
            <OrderInfo titleStyle={{ margin: "auto" }} />
          </main>
        )}
    </>
  );
};

export default FeedDetails;
