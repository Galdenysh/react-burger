import { useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ADD_INFO_INGREDIENT } from "../../services/actions/burger.js";
import styles from "./burger-ingredients.module.scss";

const DraggableIngredient = (props) => {
  const { ingredient, setVisible } = props;
  const dispatch = useDispatch();
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { id: ingredient._id },
  });

  const openPopup = (ingredient) => {
    setVisible(true);
    dispatch({ type: ADD_INFO_INGREDIENT, payload: ingredient });
  };

  return (
    <li className={`${styles.ingredientsItem}`} onClick={() => openPopup(ingredient)} ref={dragRef}>
      {ingredient.qty > 0 && <Counter count={ingredient.qty} size="default" />}
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
