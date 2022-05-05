import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import DraggableIngredient from "./draggable-ingredient.jsx";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.scss";

const BurgerIngredients = (props) => {
  const [current, setCurrent] = useState("bun");
  const containerRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  const ingredientsData = useSelector((store) => store.burgerReducer.ingredientsData);

  const onTabClick = (ref) => {
    ref.current.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  const onContainterScroll = () => {
    const scrollTop = containerRef.current.scrollTop;
    const bunHeight = bunRef.current.clientHeight;
    const sauceHeight = sauceRef.current.clientHeight;

    if (scrollTop < bunHeight / 2) {
      setCurrent("bun");
    } else if (scrollTop > bunHeight / 2 && scrollTop < bunHeight + sauceHeight / 2) {
      setCurrent("sauce");
    } else {
      setCurrent("main");
    }
  };

  return (
    <section className={`${styles.burgerIngredients} mt-10 mr-10`}>
      <h1 className={"text text_type_main-large"}>Собери бургер</h1>
      <div className={`${styles.tab} mt-5`}>
        <Tab
          value="bun"
          active={current === "bun"}
          onClick={(evt) => {
            setCurrent(evt);
            onTabClick(bunRef);
          }}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={(evt) => {
            setCurrent(evt);
            onTabClick(sauceRef);
          }}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={(evt) => {
            setCurrent(evt);
            onTabClick(mainRef);
          }}
        >
          Начинки
        </Tab>
      </div>
      <div className={styles.container} onScroll={onContainterScroll} ref={containerRef}>
        {ingredientsList(
          ingredientsData.filter((item) => item.type === "bun"), // Получаем массив с булками
          "Булки",
          props.setVisible,
          bunRef
        )}

        {ingredientsList(
          ingredientsData.filter((item) => item.type === "sauce"), // Получаем массив с соусами
          "Соусы",
          props.setVisible,
          sauceRef
        )}

        {ingredientsList(
          ingredientsData.filter((item) => item.type === "main"), // Получаем массив с начинками
          "Начинки",
          props.setVisible,
          mainRef
        )}
      </div>
    </section>
  );
};

const ingredientsList = (ingredients, type, setVisible, tabRef) => {
  return (
    <ul className={styles.ingredientsWrap} ref={tabRef}>
      <h2 className={`text text_type_main-medium pt-10`}>{type}</h2>
      <ul className={`${styles.ingredientsList} mt-6`}>
        {ingredients.map((ingredient) => (
          <DraggableIngredient key={ingredient._id} ingredient={ingredient} setVisible={setVisible} />
        ))}
      </ul>
    </ul>
  );
};

BurgerIngredients.propTypes = {
  setVisible: PropTypes.func.isRequired,
};

export default BurgerIngredients;
