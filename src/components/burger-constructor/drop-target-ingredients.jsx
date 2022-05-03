import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.scss";
import {
  ADD_BUN_INGREDIENT,
  ADD_FILLING_INGREDIENT,
  DECREASE_FILLING_INGREDIENT,
  INCREASE_FILLING_INGREDIENT,
  REMOVE_FILLING_INGREDIENT,
} from "../../services/actions/burger.js";

const DropTargetIngredients = (props) => {
  const { bunSelect, fillingSelect } = props;
  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop: (itemId) => onDropHandler(itemId),
  });
  const dispatch = useDispatch();
  const ingredientsData = useSelector((store) => store.burgerReducer.ingredientsData);

  useEffect(() => {
    dispatch({ type: ADD_BUN_INGREDIENT, payload: bunSelect });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDropHandler = (itemId) => {
    const ingredientTarget = ingredientsData.filter((ingredient) => itemId.id === ingredient._id);

    // eslint-disable-next-line no-unused-expressions
    ingredientTarget[0].type === "bun"
      ? dispatch({ type: ADD_BUN_INGREDIENT, payload: ingredientTarget[0] })
      : (dispatch({ type: ADD_FILLING_INGREDIENT, payload: ingredientTarget[0] }), dispatch({ type: INCREASE_FILLING_INGREDIENT, id: itemId.id }));
  };

  const removeFillingIngredient = (ingredient) => {
    dispatch({ type: REMOVE_FILLING_INGREDIENT, id: ingredient.constructorId });
    dispatch({ type: DECREASE_FILLING_INGREDIENT, id: ingredient._id });
  };

  return (
    <>
      <div className={`${styles.ingredientElement} ml-2`}>
        <ConstructorElement type="top" isLocked={true} text={`${bunSelect.name} (верх)`} price={bunSelect.price} thumbnail={bunSelect.image} />
      </div>
      <ul className={`${styles.ingredientsList} pr-2`} ref={dropTarget}>
        {!fillingSelect.length && (
          <>
            <p className={`${styles.emptyList} text text_type_main-default text_color_inactive`}>Здесь пусто.</p>
            <p className={`${styles.emptyList} text text_type_main-default text_color_inactive`}>
              Вы можете добавить ингредиенты в список, перетащив их карточку из корзины сюда.
            </p>
          </>
        )}
        {fillingSelect.map((ingredient) => (
          <li className={styles.ingredientsItem} key={ingredient.constructorId}>
            <div className={"mr-2"}>
              <DragIcon type="primary" />
            </div>
            <ConstructorElement
              handleClose={() => removeFillingIngredient(ingredient)}
              isLocked={false}
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
            />
          </li>
        ))}
      </ul>
      <div className={`${styles.ingredientElement} ml-2`}>
        <ConstructorElement type="bottom" isLocked={true} text={`${bunSelect.name} (низ)`} price={bunSelect.price} thumbnail={bunSelect.image} />
      </div>
    </>
  );
};

export default DropTargetIngredients;
