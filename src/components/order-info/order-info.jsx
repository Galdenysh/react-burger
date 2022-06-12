import { useSelector } from "react-redux";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { v4 as uuidv4 } from "uuid";
import styles from "./order-info.module.scss";
import { calcCost } from "../../utils/cost";
import { feeds } from "../../utils/feeds";

const OrderInfo = () => {
  const order = feeds.orders[0];
  const ingredientsData = useSelector((store) => store.burgerReducer.ingredientsData);

  const ingredients = order.ingredients
    .map((ingredient) => {
      return (ingredient = ingredientsData.filter(({ _id }) => ingredient.includes(_id)))[0];
    })
    .map((ingredient) => {
      return { ...ingredient, uniqueId: uuidv4() };
    });

  const bun = ingredients.filter((ingredient) => ingredient.type === "bun")[0];
  const filling = ingredients.filter((ingredient) => ingredient.type !== "bun");

  return (
    <>
      <div className={styles.container}>
        <p className="text text_type_digits-default">{`#${order.number}`}</p>
        <h1 className="text text_type_main-medium mt-10">Black Hole Singularity острый бургер</h1>
        <p className="text text_type_main-default mt-3" style={{ color: "#00cccc" }}>
          {order.status}
        </p>
        <p className="text text_type_main-medium mt-15">Состав:</p>
        <ul className={`${styles.ingredientsList} mt-6 pr-6`}>
          {ingredients.map((ingredient) => (
            <li className={`${styles.ingredientsItem} mt-4`}>
              <div className={styles.ingredientsGradient}>
                <img className={styles.ingredientsImage} src={ingredient.image_mobile} alt={ingredient.name} />
              </div>
              <p className={`${styles.ingredientsText} text text_type_main-default ml-4`}>{ingredient.name}</p>
              <p className={`${styles.priceText} text text_type_digits-default mr-2`}>{`${ingredient.type === "bun" ? "2" : "1"} x ${ingredient.price}`}</p>
              <CurrencyIcon type="primary" />
            </li>
          ))}
        </ul>
        <div className={`${styles.priceWrap} mt-10`}>
          <p className="text text_type_main-default text_color_inactive">{order.createdAt}</p>
          <p className={`${styles.priceText} text text_type_digits-default mr-2`}>{calcCost(bun, filling)}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </>
  );
};

export default OrderInfo;
