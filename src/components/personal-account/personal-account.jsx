import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./personal-account.module.scss";
import { getUserData, GET_USER_STATUS_LOADING, logout, setUserData } from "../../services/actions/auth";
import { GET_INGREDIENTS_STATUS_LOADING } from "../../services/actions/burger";

const PersonalAccount = () => {
  const [valuePassword, setValuePassword] = useState("");
  const [valueUserName, setValueUserName] = useState("");
  const [valueEmail, setValueEmail] = useState("");
  const [visible, setVisible] = useState(false);
  const isInitialMount = useRef(true);
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.authReducer.user);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      setValueUserName(userData.name);
      setValueEmail(userData.email);
    } else {
      dispatch(getUserData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  useEffect(() => {
    valueUserName === userData.name && valueEmail === userData.email && valuePassword.length === 0 ? setVisible(false) : setVisible(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueUserName, valueEmail, valuePassword]);

  const setActive = ({ isActive }) => {
    return { color: isActive ? "#f2f2f3" : "#8585ad" };
  };

  const saveChanges = (userName, email, password) => {
    dispatch(setUserData(userName, email, password));
    setVisible(false);
  };

  const undoChanges = () => {
    setValueUserName(userData.name);
    setValueEmail(userData.email);
  };

  const exit = () => {
    dispatch({ type: GET_INGREDIENTS_STATUS_LOADING });
    dispatch(logout());
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const userName = form.userName.value;
    const email = form.email.value;
    const password = form.password.value;

    saveChanges(userName, email, password);
  };

  return (
    <section className={styles.container}>
      <div className={`${styles.menu} mr-15`}>
        <NavLink
          className={`${styles.link} text text_type_main-medium`}
          style={setActive}
          to="/profile/"
          onClick={() => dispatch({ type: GET_USER_STATUS_LOADING })}
        >
          Профиль
        </NavLink>
        <NavLink className={`${styles.link} text text_type_main-medium`} style={setActive} to="/profile/order">
          История заказов
        </NavLink>
        <NavLink className={`${styles.link} text text_type_main-medium`} to={"/"} onClick={exit}>
          Выход
        </NavLink>
        <p className="text text_type_main-default text_color_inactive mt-20" style={{ opacity: "0.4" }}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <span>
          <Input
            type={"text"}
            name={"userName"}
            placeholder={"Имя"}
            size={"default"}
            icon={"EditIcon"}
            value={valueUserName}
            onChange={(evt) => setValueUserName(evt.target.value)}
          ></Input>
        </span>
        <span className="mt-6">
          <Input
            type={"email"}
            name={"email"}
            placeholder={"Логин"}
            size={"default"}
            icon={"EditIcon"}
            value={valueEmail}
            onChange={(evt) => setValueEmail(evt.target.value)}
          ></Input>
        </span>
        <span className="mt-6">
          <Input
            type={"password"}
            name={"password"}
            placeholder={"Пароль"}
            size={"default"}
            icon={"EditIcon"}
            value={valuePassword}
            onChange={(evt) => setValuePassword(evt.target.value)}
          ></Input>
        </span>
        <div className={`${styles.buttons} mt-6`} style={{ opacity: visible ? "1" : "0" }}>
          <span className="mr-6">
            <Button type="primary" size="medium" disabled={!visible}>
              Сохранить
            </Button>
          </span>
          <Button type="primary" size="medium" disabled={!visible} onClick={undoChanges} htmlType="button">
            Отмена
          </Button>
        </div>
      </form>
    </section>
  );
};

export default PersonalAccount;
