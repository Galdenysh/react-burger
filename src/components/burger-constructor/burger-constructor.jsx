import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.scss";

const BurgerConstructor = () => {
  const img = {};

  return (
    <section>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <ConstructorElement type="top" isLocked={true} text="Краторная булка N-200i (верх)" price={200} thumbnail={img} />
        <ConstructorElement text="Краторная булка N-200i (верх)" price={50} thumbnail={img} />
        <ConstructorElement type="bottom" isLocked={true} text="Краторная булка N-200i (низ)" price={200} thumbnail={img} />
      </div>
    </section>
  );
};

export default BurgerConstructor;
