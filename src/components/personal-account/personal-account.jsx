import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./personal-account.module.scss";
import { logout, setUserData } from "../../services/actions/auth";

const PersonalAccount = () => {
  const [valuePassword, setValuePassword] = useState("");
  const [valueUserName, setValueUserName] = useState("");
  const [valueEmail, setValueEmail] = useState("");
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.authReducer.user);

  useEffect(() => {
    setValueUserName(userData.name);
    setValueEmail(userData.email);
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
    dispatch(logout());
  };

  return (
    <section className={styles.container}>
      <div className={`${styles.menu} mr-15`}>
        <NavLink className={`${styles.link} text text_type_main-medium`} style={setActive} to="/profile/">
          Профиль
        </NavLink>
        <NavLink className={`${styles.link} text text_type_main-medium`} style={setActive} to="/profile/orders">
          История заказов
        </NavLink>
        <NavLink className={`${styles.link} text text_type_main-medium`} to={"/"} onClick={exit}>
          Выход
        </NavLink>
        <p className="text text_type_main-default text_color_inactive mt-20" style={{ opacity: "0.4" }}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <form className={styles.form} onSubmit={(evt) => evt.preventDefault()}>
        <span>
          <Input
            type={"text"}
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
            placeholder={"Пароль"}
            size={"default"}
            icon={"EditIcon"}
            value={valuePassword}
            onChange={(evt) => setValuePassword(evt.target.value)}
          ></Input>
        </span>
        <div className={`${styles.buttons} mt-6`} style={{ opacity: visible ? "1" : "0" }}>
          <span className="mr-4">
            <Button type="primary" size="medium" onClick={() => saveChanges(valueUserName, valueEmail, valuePassword)} disabled={visible ? "" : "disabled"}>
              Сохранить
            </Button>
          </span>
          <Button type="primary" size="medium" onClick={undoChanges} disabled={visible ? "" : "disabled"}>
            Отмена
          </Button>
        </div>
      </form>
    </section>
  );
};

export default PersonalAccount;
