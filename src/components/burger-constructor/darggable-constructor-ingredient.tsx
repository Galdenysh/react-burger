import { FC, useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrop, useDrag } from "react-dnd";
import type { Identifier, XYCoord } from "dnd-core";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.scss";
import { decreaseFillingIngredient, removeFillingIngredient } from "../../services/actions/burger.js";
import { IIngredient } from "../../utils/types";

interface DraggableConstructorIngredientProps {
  ingredient: IIngredient;
  index: number;
  moveIngredient: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const DraggableConstructorIngredient: FC<DraggableConstructorIngredientProps> = (props) => {
  const { ingredient, index, moveIngredient } = props;
  const ref = useRef<HTMLLIElement>(null);
  const dispatch = useDispatch();
  const [{ isDragging }, dragRef] = useDrag({
    type: "constructorIngredient",
    item: { id: ingredient.constructorId, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [{ handlerId }, dropRef] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: "constructorIngredient",
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveIngredient(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const remove = (ingredient: IIngredient) => {
    dispatch(removeFillingIngredient(ingredient.constructorId));
    dispatch(decreaseFillingIngredient(ingredient._id));
  };

  dragRef(dropRef(ref));

  return (
    <li
      className={styles.ingredientsItem}
      style={{ opacity: isDragging ? "0" : "1" }}
      ref={ref}
      data-handler-id={handlerId}
    >
      <div className={"mr-2"}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        handleClose={() => remove(ingredient)}
        isLocked={false}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
      />
    </li>
  );
};

export default DraggableConstructorIngredient;
