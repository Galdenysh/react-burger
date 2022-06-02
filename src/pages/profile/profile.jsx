import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.scss";
import { LOGGEDIN } from "../../services/actions/auth";
import { api } from "../../components/api/api";

const Profile = () => {
  const [valuePassword, setValuePassword] = useState("");
  const [link, setLink] = useState("/profile");
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.authReducer.user);

  const setActive = ({ isActive }) => {
    return { color: isActive ? "#f2f2f3" : "#8585ad" };
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
        <NavLink className={`${styles.link} text text_type_main-medium`} style={setActive} to="/profile">
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
      <form className={styles.form}>
        <span>
          <Input placeholder={"Имя"} value={userData.name} size={"default"} icon={"EditIcon"}></Input>
        </span>
        <span className="mt-6">
          <Input placeholder={"Логин"} value={userData.email} size={"default"} icon={"EditIcon"}></Input>
        </span>
        <span className="mt-6">
          <PasswordInput name={"password"} value={valuePassword} onChange={(evt) => setValuePassword(evt.target.value)}></PasswordInput>
        </span>
      </form>
    </section>
  );
};

export default Profile;
