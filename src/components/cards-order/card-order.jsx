import { useSelector } from "react-redux";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { v4 as uuidv4 } from "uuid";
import CardIngredient from "./card-ingredient";
import styles from "./cards-order.module.scss";
import { calcCost } from "../../utils/cost";

const CardOrder = (props) => {
  const { order } = props;
  const ingredientQty = 6;
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
      <li className={`${styles.feedsItem} pt-6 pb-6 pl-6 pr-6`}>
        <div className={`${styles.idWrap}`}>
          <p className="text text_type_digits-default">{`#${order.number}`}</p>
          <p className="text text_type_main-default text_color_inactive">{order.createdAt}</p>
        </div>
        <h2 className="text text_type_main-medium mt-6">Death Star Starship Main бургер</h2>
        <div className={`${styles.ingredientsWrap} mt-6`}>
          <ul className={styles.ingredientsList}>
            {ingredients
              .map((ingredient, index) => (
                <CardIngredient ingredient={ingredient} index={index} ingredientQty={ingredientQty} total={ingredients.length} key={ingredient.uniqueId} />
              ))
              .slice(0, ingredientQty)}
          </ul>
          <p className={`${styles.ingredientsText} text text_type_digits-default mr-2`}>{calcCost(bun, filling)}</p>
          <CurrencyIcon type="primary" />
        </div>
      </li>
    </>
  );
};

export default CardOrder;
