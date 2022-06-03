import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.scss";
import { useDispatch } from "react-redux";
import { GET_INGREDIENTS_STATUS_LOADING } from "../../services/actions/burger";
import { GET_USER_STATUS_LOADING } from "../../services/actions/auth";

const links = {
  main: "/",
  order: "/orders",
  profile: "/profile/",
};

const AppHeader = () => {
  const [constructorIconState, setConstructorIconState] = useState("secondary");
  const [orderIconState, setOrderIconState] = useState("secondary");
  const [profileIconState, setProfileIconState] = useState("secondary");
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    location.pathname === links.main ? setConstructorIconState("primary") : setConstructorIconState("secondary");
    location.pathname === links.order ? setOrderIconState("primary") : setOrderIconState("secondary");
    location.pathname === links.profile ? setProfileIconState("primary") : setProfileIconState("secondary");
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
            <NavLink
              className={`${styles.link} text text_type_main-default ml-2`}
              style={setActive}
              to={links.main}
              onClick={() => dispatch({ type: GET_INGREDIENTS_STATUS_LOADING })}
            >
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
            <NavLink
              className={`${styles.link} text text_type_main-default ml-2`}
              style={setActive}
              to={links.profile}
              onClick={() => dispatch({ type: GET_USER_STATUS_LOADING })}
            >
              Личный кабинет
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
