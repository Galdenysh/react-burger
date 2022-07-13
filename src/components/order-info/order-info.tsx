import { FC, CSSProperties } from "react";
import { useParams } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { v4 as uuidv4 } from "uuid";
import styles from "./order-info.module.scss";
import { calcCost, dateParse } from "../../utils/funcs";
import { IIngredient, IOrder } from "../../utils/types";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface OrderInfoProps {
  titleStyle?: CSSProperties;
  wsAuth: boolean;
}

const OrderInfo: FC<OrderInfoProps> = (props) => {
  const { titleStyle, wsAuth } = props;
  const ingredientsData = useTypedSelector((store) => store.burger.ingredientsData);
  const feedData = useTypedSelector((store) => store.ws);
  const feedDataAuth = useTypedSelector((store) => store.wsAuth);
  const data = wsAuth ? feedDataAuth : feedData;
  const orderSelect = useParams();
  const order = data.messages[0].orders.filter((item: IOrder) => item._id === orderSelect.id)[0];
  let status;

  const ingredients = order.ingredients
    .filter(Boolean)
    .map((ingredientId: string) => {
      return ingredientsData.filter(({ _id }) => ingredientId.includes(_id))[0];
    })
    .map((ingredient: IIngredient) => {
      return { ...ingredient, uniqueId: uuidv4() };
    });

  const bun = ingredients.filter((ingredient: IIngredient) => ingredient.type === "bun")[0];
  const filling = ingredients.filter((ingredient: IIngredient) => ingredient.type !== "bun");

  const filteredIngredient = filling.slice(0);
  if (bun) filteredIngredient.unshift(bun);

  if (order.status === "done") {
    status = "Выполнен";
  } else if (order.status === "pending") {
    status = "В работе";
  } else {
    status = "Создан";
  }

  return (
    <section className={styles.container}>
      <p className="text text_type_digits-default" style={titleStyle}>
        {`#${order.number}`}
      </p>
      <h1 className="text text_type_main-medium mt-10">{order.name}</h1>
      <p className="text text_type_main-default mt-3" style={{ color: order.status === "done" ? "#00cccc" : "" }}>
        {status}
      </p>
      <p className="text text_type_main-medium mt-15">Состав:</p>
      <ul className={`${styles.ingredientsList} mt-6 pr-6`}>
        {filteredIngredient.map((ingredient: IIngredient, index: number) => (
          <li className={`${styles.ingredientsItem} mt-4`} key={index}>
            <div className={styles.ingredientsGradient}>
              <img className={styles.ingredientsImage} src={ingredient.image_mobile} alt={ingredient.name} />
            </div>
            <p className={`${styles.ingredientsText} text text_type_main-default ml-4`}>{ingredient.name}</p>
            <p className={`${styles.priceText} text text_type_digits-default mr-2`}>{`${
              ingredient.type === "bun" ? "2" : "1"
            } x ${ingredient.price}`}</p>
            <CurrencyIcon type="primary" />
          </li>
        ))}
      </ul>
      <div className={`${styles.priceWrap} mt-10`}>
        <p className="text text_type_main-default text_color_inactive">{dateParse(order.createdAt)}</p>
        <p className={`${styles.priceText} text text_type_digits-default mr-2`}>{calcCost(bun, filling)}</p>
        <CurrencyIcon type="primary" />
      </div>
    </section>
  );
};

export default OrderInfo;
