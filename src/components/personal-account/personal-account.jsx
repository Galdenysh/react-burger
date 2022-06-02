import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { api } from "../api/api";
import styles from "./personal-account.module.scss";
import { LOGGEDIN } from "../../services/actions/auth";

const PersonalAccount = () => {
  const [valuePassword, setValuePassword] = useState("");
  const [valueUserName, setValueUserName] = useState("");
  const [valueEmail, setValueEmail] = useState("");
  const [link, setLink] = useState("/profile/");
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.authReducer.user);

  useEffect(() => {
    setValueUserName(userData.name);
    setValueEmail(userData.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  useEffect(() => {
    valueUserName === userData.name && valueEmail === userData.email ? setVisible(false) : setVisible(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueUserName, valueEmail]);

  const setActive = ({ isActive }) => {
    return { color: isActive ? "#f2f2f3" : "#8585ad" };
  };

  const setUserData = (userName, email) => {
    api
      .setUserData({
        name: userName,
        email: email,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const undoChanges = () => {
    setValueUserName(userData.name);
    setValueEmail(userData.email);
  };

  const logout = () => {
    api
      .logout()
      .then((res) => {
        if (res.success) {
          dispatch({ type: LOGGEDIN, payload: false });
          setLink("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
        <NavLink className={`${styles.link} text text_type_main-medium`} to={link} onClick={logout}>
          Выход
        </NavLink>
        <p className="text text_type_main-default text_color_inactive mt-20" style={{ opacity: "0.4" }}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <form className={styles.form} onSubmit={(evt) => evt.preventDefault()}>
        <span>
          <Input placeholder={"Имя"} size={"default"} icon={"EditIcon"} value={valueUserName} onChange={(evt) => setValueUserName(evt.target.value)}></Input>
        </span>
        <span className="mt-6">
          <Input placeholder={"Логин"} size={"default"} icon={"EditIcon"} value={valueEmail} onChange={(evt) => setValueEmail(evt.target.value)}></Input>
        </span>
        <span className="mt-6">
          <PasswordInput name={"password"} value={valuePassword} onChange={(evt) => setValuePassword(evt.target.value)}></PasswordInput>
        </span>
        <div className={`${styles.buttons} mt-6`} style={{ opacity: visible ? "1" : "0" }}>
          <span className="mr-4">
            <Button type="primary" size="medium" onClick={() => setUserData(valueUserName, valueEmail)} disabled={visible ? "" : "disabled"}>
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
