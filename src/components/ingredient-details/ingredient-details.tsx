import { FC, CSSProperties } from "react";
import { useParams } from "react-router-dom";
import styles from "./ingredient-details.module.scss";
import { IIngredient } from "../../utils/types";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface IngredientDetailsProps {
  titleStyle?: CSSProperties;
}

const IngredientDetails: FC<IngredientDetailsProps> = (props) => {
  const { titleStyle } = props;
  const ingredients = useTypedSelector((store) => store.burger.ingredientsData);
  const ingredientSelect = useParams();
  const ingredient = ingredients.filter((item) => item._id === ingredientSelect.id);

  return (
    <>
      <h2 className={`${styles.popupTitle} text text_type_main-large mt-10 ml-10`} style={titleStyle}>
        Детали ингредиента
      </h2>
      <img src={ingredient[0]?.image_large} alt="ингредиент" className={styles.ingredientImage} />
      <p className="text text_type_main-medium mt-4">{ingredient[0]?.name}</p>
      <ul className={`${styles.caloricityList} mt-8 mb-15`}>
        <li className={`${styles.caloricityItem} mr-5`}>
          <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
          <p className="text text_type_main-default text_color_inactive">{ingredient[0]?.calories}</p>
        </li>
        <li className={`${styles.caloricityItem} mr-5`}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_main-default text_color_inactive">{ingredient[0]?.proteins}</p>
        </li>
        <li className={`${styles.caloricityItem} mr-5`}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_main-default text_color_inactive">{ingredient[0]?.fat}</p>
        </li>
        <li className={styles.caloricityItem}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_main-default text_color_inactive">{ingredient[0]?.carbohydrates}</p>
        </li>
      </ul>
    </>
  );
};

export default IngredientDetails;
