import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.scss";

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <ul className={styles.list}>
          <li className={`${styles.listItem} pt-4 pr-5 pb-4 pl-5 mt-4 mb-4 mr-2`}>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default ml-2">Конструктор</p>
          </li>
          <li className={`${styles.listItem} pt-4 pr-5 pb-4 pl-5 mt-4 mb-4`}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p>
          </li>
        </ul>
        <div className={styles.logo}>
          <Logo />
        </div>
        <ul className={styles.list}>
          <li className={`${styles.listItem} pt-4 pr-5 pb-4 pl-5 mt-4 mb-4`}>
            <ProfileIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</p>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;