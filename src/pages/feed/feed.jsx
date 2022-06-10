import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed.module.scss";

const Feed = () => {
  return (
    <main className={styles.content}>
      <h1 className={`${styles.title} text text_type_main-large`}>Лента заказов</h1>
      <div className={styles.container}>
        <ul className={styles.feedsList}>
          <li className={`${styles.feedsItem} pt-6 pb-6 pl-6 pr-6`}>
            <div className={`${styles.idWrap}`}>
              <p className="text text_type_digits-default">#034535</p>
              <p className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</p>
            </div>
            <h2 className="text text_type_main-medium mt-6">Death Star Starship Main бургер</h2>
            <div className={`${styles.ingredientsWrap} mt-6`}>
              <ul className={styles.ingredientsList}>
                <li className={styles.ingredientsItem}></li>
              </ul>
              <p className={`${styles.ingredientsText} text text_type_digits-default mr-2`}>480</p>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default Feed;
