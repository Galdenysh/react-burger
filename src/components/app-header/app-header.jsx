import { useState } from "react";
import { NavLink, useMatch } from "react-router-dom";
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.scss";

const links = {
  main: "/",
  order: "/orders",
  profile: "/profile",
};

const AppHeader = () => {
  const [constructorIconState, setConstructorIconState] = useState("secondary");
  const [orderIconState, setOrderIconState] = useState("secondary");
  const [profileIconState, setProfileIconState] = useState("secondary");
  const constructorMatch = useMatch(links.main);
  const orderMatch = useMatch(links.order);
  const profileMatch = useMatch(links.profile);

  const setActive = ({ isActive }) => {
    if (constructorMatch !== null && isActive) {
      setConstructorIconState("primary");
      setOrderIconState("secondary");
      setProfileIconState("secondary");
    }

    if (orderMatch !== null && isActive) {
      setConstructorIconState("secondary");
      setOrderIconState("primary");
      setProfileIconState("secondary");
    }

    if (profileMatch !== null && isActive) {
      setConstructorIconState("secondary");
      setOrderIconState("secondary");
      setProfileIconState("primary");
    }

    return { color: isActive ? "#f2f2f3" : "#8585ad" };
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <ul className={styles.list}>
          <li className={`${styles.listItem} pt-4 pr-5 pb-4 pl-5 mt-4 mb-4 mr-2`}>
            <BurgerIcon type={constructorIconState} />
            <NavLink className={`${styles.link} text text_type_main-default ml-2`} style={setActive} to={links.main}>
              Конструктор
            </NavLink>
          </li>
          <li className={`${styles.listItem} pt-4 pr-5 pb-4 pl-5 mt-4 mb-4`}>
            <ListIcon type={orderIconState} />
            <NavLink className={`${styles.link} text text_type_main-default ml-2`} style={setActive} to={links.order}>
              Лента заказов
            </NavLink>
          </li>
        </ul>
        <div className={styles.logo}>
          <Logo />
        </div>
        <ul className={styles.list}>
          <li className={`${styles.listItem} pt-4 pr-5 pb-4 pl-5 mt-4 mb-4`}>
            <ProfileIcon type={profileIconState} />
            <NavLink className={`${styles.link} text text_type_main-default ml-2`} style={setActive} to={links.profile}>
              Личный кабинет
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
