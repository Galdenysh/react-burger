import PropTypes from "prop-types";
import styles from "./ingredient-details.module.scss";

const IngredientDetails = (props) => {
  return (
    <>
      <h2 className={`${styles.popupTitle} text text_type_main-large mt-10 ml-10`}>Детали ингредиента</h2>
      <img src={props.ingredient.image_large} alt="ингредиент" className={styles.ingredientImage} />
      <p className="text text_type_main-medium mt-4">{props.ingredient.name}</p>
      <ul className={`${styles.caloricityList} mt-8 mb-15`}>
        <li className={`${styles.caloricityItem} mr-5`}>
          <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
          <p className="text text_type_main-default text_color_inactive">{props.ingredient.calories}</p>
        </li>
        <li className={`${styles.caloricityItem} mr-5`}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_main-default text_color_inactive">{props.ingredient.proteins}</p>
        </li>
        <li className={`${styles.caloricityItem} mr-5`}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_main-default text_color_inactive">{props.ingredient.fat}</p>
        </li>
        <li className={styles.caloricityItem}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_main-default text_color_inactive">{props.ingredient.carbohydrates}</p>
        </li>
      </ul>
    </>
  );
};

IngredientDetails.propTypes = {
  name: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  image_large: PropTypes.string,
};

export default IngredientDetails;
