import { FC } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { v4 as uuidv4 } from "uuid";
import CardIngredient from "./card-ingredient";
import styles from "./cards-order.module.scss";
import { calcCost, dateParse } from "../../utils/funcs";
import { IIngredient, IOrder } from "../../utils/types";

interface ICardOrderProps {
  order: IOrder;
  wsAuth: boolean;
}

const CardOrder: FC<ICardOrderProps> = (props) => {
  const { order, wsAuth } = props;
  const ingredientQty = 6;
  const ingredientsData = useSelector((store: any) => store.burgerReducer.ingredientsData);
  const navigate = useNavigate();
  const location = useLocation();
  let status;

  const ingredients = order.ingredients
    .filter(Boolean)
    .map((ingredientId: string) => {
      return ingredientsData.filter(({ _id }: any) => ingredientId.includes(_id))[0];
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

  const openPopup = () => {
    navigate(`${location.pathname}/${order._id}`, { state: { background: location } });
  };

  return (
    <>
      <li className={`${styles.feedsItem} pt-6 pb-6 pl-6 pr-6`} onClick={openPopup}>
        <div className={`${styles.idWrap}`}>
          <p className="text text_type_digits-default">{`#${order.number}`}</p>
          <p className="text text_type_main-default text_color_inactive">{dateParse(order.createdAt)}</p>
        </div>
        <h2 className="text text_type_main-medium mt-6">{order.name}</h2>
        {wsAuth && (
          <p className="text text_type_main-default mt-2" style={{ color: order.status === "done" ? "#00cccc" : "" }}>
            {status}
          </p>
        )}
        <div className={`${styles.ingredientsWrap} mt-6`}>
          <ul className={styles.ingredientsList}>
            {filteredIngredient
              .map((ingredient: IIngredient, index: number) => (
                <CardIngredient
                  ingredient={ingredient}
                  index={index}
                  ingredientQty={ingredientQty}
                  total={filteredIngredient.length}
                  key={ingredient.uniqueId}
                />
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
