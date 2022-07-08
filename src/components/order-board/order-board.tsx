import { FC } from "react";
import { useSelector } from "react-redux";
import { IOrder } from "../../utils/types";
import styles from "./order-board.module.scss";

const OrderBoard: FC = () => {
  const feedData = useSelector((store: any) => store.webSocketReducer.messages[0]);
  const ordersDone = feedData.orders.filter((order: IOrder) => order.status === "done");
  const ordersPending = feedData.orders.filter((order: IOrder) => order.status === "pending");

  return (
    <section className={`${styles.orderBoard} ml-15`}>
      <ul className={styles.orderList}>
        <li className={`${styles.orderItem} mr-9`}>
          <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
          <ul className={styles.numberList}>
            {ordersDone.slice(0, 10).map((order: IOrder, index: number) => (
              <li
                className={`${styles.numberItem} text text_type_digits-default`}
                style={{ color: "#00cccc" }}
                key={index}
              >
                {order.number}
              </li>
            ))}
          </ul>
        </li>
        <li className={styles.orderItem}>
          <h2 className="text text_type_main-medium mb-6">В работе:</h2>
          <ul className={styles.numberList}>
            {ordersPending.slice(0, 10).map((order: IOrder, index: number) => (
              <li className={`${styles.numberItem} text text_type_digits-default`} key={index}>
                {order.number}
              </li>
            ))}
          </ul>
        </li>
      </ul>
      <h2 className="text text_type_main-medium mt-15">Выполнено за все время:</h2>
      <p className={`${styles.totalText} text text_type_digits-large`}>{feedData.total}</p>
      <h2 className="text text_type_main-medium mt-15">Выполнено за сегодня:</h2>
      <p className={`${styles.totalText} text text_type_digits-large`}>{feedData.totalToday}</p>
    </section>
  );
};

export default OrderBoard;
