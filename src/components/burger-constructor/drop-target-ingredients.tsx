import { FC } from "react";
import { useDrop } from "react-dnd";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { v4 as uuidv4 } from "uuid";
import DraggableConstructorIngredient from "./darggable-constructor-ingredient";
import styles from "./burger-constructor.module.scss";
import bunImage from "../../images/bun.png";
import { IIngredient } from "../../utils/types";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import {
  addBunIngredient,
  addFillingIngredient,
  increaseFillingIngredient,
  setFillingIngredient,
} from "../../services/actions/burger";

interface DropTargetIngredient {
  bunSelect: IIngredient | null;
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
  const dispatch = useTypedDispatch();
  const ingredientsData = useTypedSelector((store) => store.burger.ingredientsData);

  const onDropHandler = (itemId: string) => {
    const ingredientTarget = ingredientsData.filter((ingredient) => itemId === ingredient._id);
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
        {bunSelect !== null && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bunSelect.name} (????????)`}
            price={bunSelect.price}
            thumbnail={bunSelect.image}
          />
        )}
        {bunSelect === null && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text="????????????????????, ???????????????????? ???????? ?????????? ?????? ???????????????? ????????????"
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
              ?????????? ??????????.
            </p>
            <p
              className={`${styles.emptyList} text text_type_main-default text_color_inactive`}
              style={{ opacity: "0.4" }}
            >
              ???? ???????????? ???????????????? ?????????????????????? ?? ????????????, ?????????????????? ???? ???????????????? ???? ?????????????? ????????.
            </p>
          </>
        )}
        {fillingSelect.map((ingredient, index) => (
          <DraggableConstructorIngredient
            ingredient={ingredient}
            index={index}
            moveIngredient={moveIngredient}
            key={ingredient.constructorId}
          />
        ))}
      </ul>
      <div className={`${styles.ingredientElement} ml-2`}>
        {bunSelect !== null && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bunSelect.name} (??????)`}
            price={bunSelect.price}
            thumbnail={bunSelect.image}
          />
        )}
        {bunSelect === null && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="????????????????????, ???????????????????? ???????? ?????????? ?????? ???????????????? ????????????"
            price={0}
            thumbnail={bunImage}
          />
        )}
      </div>
    </div>
  );
};

export default DropTargetIngredients;
