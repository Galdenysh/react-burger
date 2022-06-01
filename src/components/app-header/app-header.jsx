import { useReducer } from "react";
import { Link } from "react-router-dom";
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.scss";

const initialState = {
  constructorState: styles.link_active,
  constructorIcon: "primary",
  orderState: styles.link_inactive,
  orderIcon: "secondary",
  profileState: styles.link_inactive,
  profileIcon: "secondary",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "constructorActive":
      return {
        constructorState: styles.link_active,
        constructorIcon: "primary",
        orderState: styles.link_inactive,
        orderIcon: "secondary",
        profileState: styles.link_inactive,
        profileIcon: "secondary",
      };
    case "orderActive":
      return {
        constructorState: styles.link_inactive,
        constructorIcon: "secondary",
        orderState: styles.link_active,
        orderIcon: "primary",
        profileState: styles.link_inactive,
        profileIcon: "secondary",
      };
    case "profileActive":
      return {
        constructorState: styles.link_inactive,
        constructorIcon: "secondary",
        orderState: styles.link_inactive,
        orderIcon: "secondary",
        profileState: styles.link_active,
        profileIcon: "primary",
      };
    default:
      throw new Error();
  }
};

const AppHeader = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <ul className={styles.list}>
          <li className={`${styles.listItem} pt-4 pr-5 pb-4 pl-5 mt-4 mb-4 mr-2`}>
            <BurgerIcon type={state.constructorIcon} />
            <Link
              className={`${styles.link} ${state.constructorState} text text_type_main-default ml-2`}
              to="/"
              onClick={() => dispatch({ type: "constructorActive" })}
            >
              Конструктор
            </Link>
          </li>
          <li className={`${styles.listItem} pt-4 pr-5 pb-4 pl-5 mt-4 mb-4`}>
            <ListIcon type={state.orderIcon} />
            <Link className={`${styles.link} ${state.orderState} text text_type_main-default ml-2`} to="*" onClick={() => dispatch({ type: "orderActive" })}>
              Лента заказов
            </Link>
          </li>
        </ul>
        <div className={styles.logo}>
          <Logo />
        </div>
        <ul className={styles.list}>
          <li className={`${styles.listItem} pt-4 pr-5 pb-4 pl-5 mt-4 mb-4`}>
            <ProfileIcon type={state.profileIcon} />
            <Link
              className={`${styles.link} ${state.profileState} text text_type_main-default ml-2`}
              to="/profile"
              onClick={() => dispatch({ type: "profileActive" })}
            >
              Личный кабинет
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
