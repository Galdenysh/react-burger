import styles from "./order-board.module.scss";
import { orderBoard } from "../../utils/feeds";

const OrderBoard = () => {
  return (
    <section className={styles.orderBoard}>
      <ul className={styles.orderList}>
        <li className={`${styles.orderItem} mr-9`}>
          <h2 className="text text_type_main-medium">Готовы:</h2>
          <ul className={styles.numberList}>
            {orderBoard.ready_orders.map((order) => (
              <li className={`${styles.numberItem} text text_type_digits-default`} style={{ color: "#00cccc" }}>
                {order}
              </li>
            ))}
          </ul>
        </li>
        <li className={styles.orderItem}>
          <h2 className="text text_type_main-medium">В работе:</h2>
          <ul className={styles.numberList}>
            {orderBoard.work_orders.map((order) => (
              <li className={`${styles.numberItem} text text_type_digits-default`}>{order}</li>
            ))}
          </ul>
        </li>
      </ul>
      <h2 className="text text_type_main-medium mt-15">Выполнено за все время:</h2>
      <p className={`${styles.totalText} text text_type_digits-large`}>{orderBoard.total_orders}</p>
      <h2 className="text text_type_main-medium mt-15">Выполнено за сегодня:</h2>
      <p className={`${styles.totalText} text text_type_digits-large`}>{orderBoard.today_orders}</p>
    </section>
  );
};

export default OrderBoard;
