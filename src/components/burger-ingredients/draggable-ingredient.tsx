import { FC } from "react";
import { useDrag } from "react-dnd";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { IIngredient } from "../../utils/types";

interface DraggableIngredientProps {
  ingredient: IIngredient;
}

const DraggableIngredient: FC<DraggableIngredientProps> = (props) => {
  const { ingredient } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [{ isDragging }, dragRef] = useDrag({
    type: "ingredient",
    item: { id: ingredient._id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const openPopup = () => {
    navigate(`/ingredients/${ingredient._id}`, { state: { background: location } });
  };

  return (
    <li
      className={`${styles.ingredientsItem}`}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
      onClick={openPopup}
      ref={dragRef}
    >
      {ingredient.qty ? ingredient.qty > 0 && <Counter count={ingredient.qty} size="default" /> : <></>}
      <img src={ingredient.image} alt={ingredient.name} />
      <div className={styles.price}>
        <p className="text text_type_digits-default mt-2 mr-2">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default mt-2">{ingredient.name}</p>
    </li>
  );
};

export default DraggableIngredient;
