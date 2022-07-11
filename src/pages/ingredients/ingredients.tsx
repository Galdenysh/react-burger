import { FC } from "react";
import { useSelector } from "react-redux";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import Preloader from "../../components/preloader/preloader";
import styles from "./ingredients.module.scss";

const Ingredients: FC = () => {
  const burderData = useSelector((store: any) => store.burger);

  return (
    <>
      {burderData.isLoading && <Preloader type={"preloader"} />}
      {burderData.hasError && <Preloader type={"error"} />}
      {!burderData.isLoading && !burderData.hasError && burderData.ingredientsData.length && (
        <main className={styles.content}>
          <h2 className="text text_type_main-large">Детали ингредиента</h2>
          <IngredientDetails titleStyle={{ display: "none" }} />
        </main>
      )}
    </>
  );
};

export default Ingredients;
