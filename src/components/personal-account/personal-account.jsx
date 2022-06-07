import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./personal-account.module.scss";
import { LOGGEDOUT, logout, setUserData } from "../../services/actions/auth";

const PersonalAccount = () => {
  const [valuePassword, setValuePassword] = useState("");
  const [valueUserName, setValueUserName] = useState("");
  const [valueEmail, setValueEmail] = useState("");
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.authReducer);
  const navigate = useNavigate();

  useEffect(() => {
    setValueUserName(userData.user.name);
    setValueEmail(userData.user.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.user]);

  useEffect(() => {
    valueUserName === userData.user.name && valueEmail === userData.user.email && valuePassword.length === 0 ? setVisible(false) : setVisible(true);
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
    setValueUserName(userData.user.name);
    setValueEmail(userData.user.email);
  };

  const exit = () => {
    dispatch(logout()).then(() => {
      if (!userData.loggenIn) navigate("/login");
    });
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
        <NavLink className={`${styles.link} text text_type_main-medium`} style={setActive} to="/profile">
          Профиль
        </NavLink>
        <NavLink className={`${styles.link} text text_type_main-medium`} style={setActive} to="/profile/order">
          История заказов
        </NavLink>
        <NavLink className={`${styles.link} text text_type_main-medium`} to="" onClick={exit}>
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
