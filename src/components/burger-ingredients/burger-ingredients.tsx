import { useState, useRef, FC, RefObject } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import DraggableIngredient from "./draggable-ingredient";
import styles from "./burger-ingredients.module.scss";
import { IIngredient } from "../../utils/types";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const BurgerIngredients: FC = () => {
  const [current, setCurrent] = useState("bun");
  const containerRef = useRef<HTMLDivElement>(null);
  const bunRef = useRef<HTMLUListElement>(null);
  const sauceRef = useRef<HTMLUListElement>(null);
  const mainRef = useRef<HTMLUListElement>(null);
  const ingredientsData = useTypedSelector((store) => store.burger.ingredientsData);

  const onTabClick = (ref: RefObject<HTMLUListElement>) => {
    ref.current?.scrollIntoView({ block: "start", behavior: "smooth" });
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
        {/* @ts-ignore */}
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
        {/* @ts-ignore */}
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
        {/* @ts-ignore */}
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
          ingredientsData.filter((item: IIngredient) => item.type === "bun"), // Получаем массив с булками
          "Булки",
          bunRef
        )}

        {ingredientsList(
          ingredientsData.filter((item: IIngredient) => item.type === "sauce"), // Получаем массив с соусами
          "Соусы",
          sauceRef
        )}

        {ingredientsList(
          ingredientsData.filter((item: IIngredient) => item.type === "main"), // Получаем массив с начинками
          "Начинки",
          mainRef
        )}
      </div>
    </section>
  );
};

const ingredientsList = (ingredients: IIngredient[], type: string, tabRef: RefObject<HTMLUListElement>) => {
  return (
    <ul className={styles.ingredientsWrap} ref={tabRef}>
      <h2 className={`text text_type_main-medium pt-10`}>{type}</h2>
      <ul className={`${styles.ingredientsList} mt-6`}>
        {ingredients.map((ingredient: IIngredient) => (
          <DraggableIngredient key={ingredient._id} ingredient={ingredient} />
        ))}
      </ul>
    </ul>
  );
};

export default BurgerIngredients;
