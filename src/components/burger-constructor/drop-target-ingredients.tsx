import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { v4 as uuidv4 } from "uuid";
import DraggableConstructorIngredient from "./darggable-constructor-ingredient";
import styles from "./burger-constructor.module.scss";
import {
  addBunIngredient,
  addFillingIngredient,
  increaseFillingIngredient,
  setFillingIngredient,
} from "../../services/actions/burger";
import bunImage from "../../images/bun.png";
import { IIngredient } from "../../utils/types";

interface DropTargetIngredient {
  bunSelect: IIngredient;
  fillingSelect: IIngredient[];
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const DropTargetIngredients: FC<DropTargetIngredient> = (props) => {
  const { bunSelect, fillingSelect } = props;

  const [, dropTarget] = useDrop<DragItem>({
    accept: "ingredient",
    drop: (item: DragItem) => onDropHandler(item.id),
  });
  const dispatch = useDispatch();
  const ingredientsData = useSelector((store: any) => store.burger.ingredientsData);

  const onDropHandler = (itemId: string) => {
    const ingredientTarget = ingredientsData.filter((ingredient: IIngredient) => itemId === ingredient._id);
    const ingredientTargetWithId = { ...ingredientTarget[0], constructorId: uuidv4() };

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    ingredientTargetWithId.type === "bun"
      ? dispatch(addBunIngredient(ingredientTargetWithId))
      : (dispatch(addFillingIngredient(ingredientTargetWithId)), dispatch(increaseFillingIngredient(itemId)));
  };

  const moveIngredient = (dragIndex: number, hoverIndex: number) => {
    const newFillingSelect = [...fillingSelect];
    const dragItem = newFillingSelect.splice(dragIndex, 1);
    newFillingSelect.splice(hoverIndex, 0, dragItem[0]);

    dispatch(setFillingIngredient(newFillingSelect));
  };

  return (
    <div className={styles.elements} ref={dropTarget}>
      <div className={`${styles.ingredientElement} ml-2`}>
        {Object.keys(bunSelect).length !== 0 && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bunSelect.name} (верх)`}
            price={bunSelect.price}
            thumbnail={bunSelect.image}
          />
        )}
        {Object.keys(bunSelect).length === 0 && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Пожалуйста, перенесите сюда булку для создания заказа"
            price={0}
            thumbnail={bunImage}
          />
        )}
      </div>
      <ul className={`${styles.ingredientsList} pr-2`}>
        {!fillingSelect.length && (
          <>
            <p
              className={`${styles.emptyList} text text_type_main-default text_color_inactive`}
              style={{ opacity: "0.4" }}
            >
              Здесь пусто.
            </p>
            <p
              className={`${styles.emptyList} text text_type_main-default text_color_inactive`}
              style={{ opacity: "0.4" }}
            >
              Вы можете добавить ингредиенты в список, перетащив их карточку из корзины сюда.
            </p>
          </>
        )}
        {fillingSelect.map((ingredient: IIngredient, index: number) => (
          <DraggableConstructorIngredient
            ingredient={ingredient}
            index={index}
            moveIngredient={moveIngredient}
            key={ingredient.constructorId}
          />
        ))}
      </ul>
      <div className={`${styles.ingredientElement} ml-2`}>
        {Object.keys(bunSelect).length !== 0 && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bunSelect.name} (низ)`}
            price={bunSelect.price}
            thumbnail={bunSelect.image}
          />
        )}
        {Object.keys(bunSelect).length === 0 && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Пожалуйста, перенесите сюда булку для создания заказа"
            price={0}
            thumbnail={bunImage}
          />
        )}
      </div>
    </div>
  );
};

export default DropTargetIngredients;
