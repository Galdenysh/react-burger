import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import DraggabelConstructorIngredient from "./darggable-constructor-ingredient.jsx";
import styles from "./burger-constructor.module.scss";
import { ADD_BUN_INGREDIENT, ADD_FILLING_INGREDIENT, INCREASE_FILLING_INGREDIENT, SET_FILLING_INGREDIENT } from "../../services/actions/burger.js";

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

  const moveIngredient = (dragIndex, hoverIndex) => {
    const newFillingSelect = [...fillingSelect];
    const dragItem = newFillingSelect.splice(dragIndex, 1);
    newFillingSelect.splice(hoverIndex, 0, dragItem[0]);

    dispatch({ type: SET_FILLING_INGREDIENT, payload: newFillingSelect });
  };

  return (
    <div className={styles.elements} ref={dropTarget}>
      <div className={`${styles.ingredientElement} ml-2`}>
        <ConstructorElement type="top" isLocked={true} text={`${bunSelect.name} (верх)`} price={bunSelect.price} thumbnail={bunSelect.image} />
      </div>
      <ul className={`${styles.ingredientsList} pr-2`}>
        {!fillingSelect.length && (
          <>
            <p className={`${styles.emptyList} text text_type_main-default text_color_inactive`}>Здесь пусто.</p>
            <p className={`${styles.emptyList} text text_type_main-default text_color_inactive`}>
              Вы можете добавить ингредиенты в список, перетащив их карточку из корзины сюда.
            </p>
          </>
        )}
        {fillingSelect.map((ingredient, index) => (
          <DraggabelConstructorIngredient ingredient={ingredient} index={index} moveIngredient={moveIngredient} key={ingredient.constructorId} />
        ))}
      </ul>
      <div className={`${styles.ingredientElement} ml-2`}>
        <ConstructorElement type="bottom" isLocked={true} text={`${bunSelect.name} (низ)`} price={bunSelect.price} thumbnail={bunSelect.image} />
      </div>
    </div>
  );
};

export default DropTargetIngredients;
