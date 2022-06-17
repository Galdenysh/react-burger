import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.scss";

const links = {
  main: "/",
  order: "/feed",
  profile: "/profile",
};

const AppHeader = () => {
  const [constructorIconState, setConstructorIconState] = useState("secondary");
  const [orderIconState, setOrderIconState] = useState("secondary");
  const [profileIconState, setProfileIconState] = useState("secondary");
  const location = useLocation();

  useEffect(() => {
    location.pathname === links.main ? setConstructorIconState("primary") : setConstructorIconState("secondary");
    location.pathname.includes(links.order) ? setOrderIconState("primary") : setOrderIconState("secondary");
    location.pathname.includes(links.profile) ? setProfileIconState("primary") : setProfileIconState("secondary");
  }, [location]);

  const setActive = ({ isActive }) => {
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
        <Link className={styles.logo} to={links.main}>
          <Logo />
        </Link>
        <ul className={styles.list}>
          <li className={`${styles.listItem} pt-4 pr-5 pb-4 pl-5 mt-4 mb-4`}>
            <ProfileIcon type={profileIconState} />
            <NavLink className={`${styles.link} text text_type_main-default ml-2`} style={setActive} to={links.profile} exact="true">
              Личный кабинет
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
