import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrop, useDrag } from "react-dnd";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.scss";
import { DECREASE_FILLING_INGREDIENT, REMOVE_FILLING_INGREDIENT } from "../../services/actions/burger.js";
import ingredientsPropTypes from "../../utils/types";

const DraggableConstructorIngredient = (props) => {
  const { ingredient, index, moveIngredient } = props;
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [{ isDragging }, dragRef] = useDrag({
    type: "constructorIngredient",
    item: { id: ingredient.constructorId, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [{ handlerId }, dropRef] = useDrop({
    accept: "constructorIngredient",
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover(item, monitor) {
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
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

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

  const removeFillingIngredient = (ingredient) => {
    dispatch({ type: REMOVE_FILLING_INGREDIENT, id: ingredient.constructorId });
    dispatch({ type: DECREASE_FILLING_INGREDIENT, id: ingredient._id });
  };

  dragRef(dropRef(ref));

  return (
    <li className={styles.ingredientsItem} style={{ opacity: isDragging ? "0" : "1" }} ref={ref} data-handler-id={handlerId}>
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
  );
};

DraggableConstructorIngredient.propTypes = {
  ingredient: ingredientsPropTypes.isRequired,
  index: PropTypes.number.isRequired,
  moveIngredient: PropTypes.func.isRequired,
};

export default DraggableConstructorIngredient;
