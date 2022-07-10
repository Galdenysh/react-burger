import { FC } from "react";
import { IIngredient } from "../../utils/types";
import styles from "./cards-order.module.scss";

interface CardIngredientProps {
  ingredient: IIngredient;
  index: number;
  ingredientQty: number;
  total: number;
}

const CardIngredient: FC<CardIngredientProps> = (props) => {
  const { ingredient, index, ingredientQty, total } = props;
  const remainder = total - ingredientQty;

  return (
    <>
      <li className={styles.ingredientsItem} style={{ zIndex: ingredientQty - index }}>
        {remainder !== 0 && ingredientQty === index + 1 && (
          <p className="text text_type_main-default" style={{ zIndex: "2" }}>
            {`+${remainder}`}
          </p>
        )}
        <img
          className={styles.ingredientsImage}
          src={ingredient.image_mobile}
          alt={ingredient.name}
          style={{ opacity: remainder !== 0 && ingredientQty === index + 1 ? "0.6" : "1", zIndex: "1" }}
        />
      </li>
    </>
  );
};

export default CardIngredient;
