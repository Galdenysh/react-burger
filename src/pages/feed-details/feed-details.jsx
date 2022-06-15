import { useSelector } from "react-redux";
import OrderInfo from "../../components/order-info/order-info";
import Preloader from "../../components/preloader/preloader";
import styles from "./feed-details.module.scss";

const FeedDetails = (props) => {
  const { data } = props;
  const burderData = useSelector((store) => store.burgerReducer);

  return (
    <>
      {!data.wsConnected && burderData.isLoading && <Preloader type={"preloader"} />}
      {data.error && burderData.hasError && <Preloader type={"error"} />}
      {data.wsConnected && !data.error && !!data.messages.length && !burderData.isLoading && !burderData.hasError && !!burderData.ingredientsData.length && (
        <main className={styles.content}>
          <OrderInfo data={data} titleStyle={{ margin: "auto" }} />
        </main>
      )}
    </>
  );
};

export default FeedDetails;
