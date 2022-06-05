import { useSelector } from "react-redux";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import styles from "./ingredients.module.scss";

const Ingredients = () => {
  const burderData = useSelector((store) => store.burgerReducer);

  return (
    <section className={styles.container}>
      {burderData.isLoading && <p className={`${styles.download} text text_type_main-large`}>Загрузка...</p>}
      {burderData.hasError && <p className={`${styles.download} text text_type_main-large`}>Произошла ошибка...</p>}
      {!burderData.isLoading && !burderData.hasError && burderData.ingredientsData.length && (
        <>
          <h2 className={`${styles.popupTitle} text text_type_main-large`}>Детали ингредиента</h2>
          <IngredientDetails titleStyle={{ display: "none" }} />
        </>
      )}
    </section>
  );
};

export default Ingredients;
