import { useState, useRef, FC } from "react";
import { useSelector } from "react-redux";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import DraggableIngredient from "./draggable-ingredient";
import styles from "./burger-ingredients.module.scss";

const BurgerIngredients: FC = () => {
  const [current, setCurrent] = useState("bun");
  const containerRef = useRef<HTMLDivElement>(null);
  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const ingredientsData = useSelector((store: any) => store.burgerReducer.ingredientsData);

  const onTabClick = (ref: any) => {
    ref.current.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  const onContainterScroll = () => {
    const scrollTop = containerRef.current?.scrollTop || 0;
    const bunHeight = bunRef.current?.clientHeight || 0;
    const sauceHeight = sauceRef.current?.clientHeight || 0;

    if (scrollTop < bunHeight / 2) {
      setCurrent("bun");
    } else if (scrollTop > bunHeight / 2 && scrollTop < bunHeight + sauceHeight / 2) {
      setCurrent("sauce");
    } else {
      setCurrent("main");
    }
  };

  return (
    <section className={`${styles.burgerIngredients} pt-10 mr-10`}>
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
          ingredientsData.filter((item: any) => item.type === "bun"), // Получаем массив с булками
          "Булки",

          bunRef
        )}

        {ingredientsList(
          ingredientsData.filter((item: any) => item.type === "sauce"), // Получаем массив с соусами
          "Соусы",

          sauceRef
        )}

        {ingredientsList(
          ingredientsData.filter((item: any) => item.type === "main"), // Получаем массив с начинками
          "Начинки",

          mainRef
        )}
      </div>
    </section>
  );
};

const ingredientsList = (ingredients: any, type: string, tabRef: any) => {
  return (
    <ul className={styles.ingredientsWrap} ref={tabRef}>
      <h2 className={`text text_type_main-medium pt-10`}>{type}</h2>
      <ul className={`${styles.ingredientsList} mt-6`}>
        {ingredients.map((ingredient: any) => (
          <DraggableIngredient key={ingredient._id} ingredient={ingredient} />
        ))}
      </ul>
    </ul>
  );
};

export default BurgerIngredients;
