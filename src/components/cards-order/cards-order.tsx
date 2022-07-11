import { FC } from "react";
import { useSelector } from "react-redux";
import { IOrder } from "../../utils/types";
import CardOrder from "./card-order";
import styles from "./cards-order.module.scss";

interface CardsOrderProps {
  wsAuth: boolean;
}

const CardsOrder: FC<CardsOrderProps> = (props) => {
  const { wsAuth } = props;
  const feedData = useSelector((store: any) => store.ws.messages[0]);
  const feedDataAuth = useSelector((store: any) => store.wsAuth.messages[0]);
  const data = wsAuth ? feedDataAuth : feedData;
  const orders = wsAuth ? data.orders.sort((a: IOrder, b: IOrder) => (a.number < b.number ? 1 : -1)) : data.orders;

  return (
    <div className={styles.cardsOrder}>
      <ul className={`${styles.feedsList} pr-2`}>
        {orders.slice(0, 10).map((order: IOrder) => (
          <CardOrder order={order} wsAuth={wsAuth} key={order._id} />
        ))}
      </ul>
    </div>
  );
};

export default CardsOrder;
