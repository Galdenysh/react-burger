import { Link } from "react-router-dom";
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.scss";

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <ul className={styles.list}>
          <li className={`${styles.listItem} pt-4 pr-5 pb-4 pl-5 mt-4 mb-4 mr-2`}>
            <BurgerIcon type="primary" />
            <Link className={`${styles.link} text text_type_main-default text_color_inactive ml-2`} to="/">
              Конструктор
            </Link>
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
            <Link className={`${styles.link} text text_type_main-default text_color_inactive ml-2`} to="/profile">
              Личный кабинет
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
