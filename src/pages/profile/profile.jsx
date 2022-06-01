import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.scss";
import { getUserData } from "../../services/actions/auth";

const Profile = () => {
  const [valuePassword, setValuePassword] = useState("shadow123");
  const dispatch = useDispatch();

  const setActive = ({ isActive }) => {
    return { color: isActive ? "#f2f2f3" : "#8585ad" };
  };

  useEffect(() => {
    dispatch(getUserData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.container}>
      <div className={`${styles.menu} mr-15`}>
        <NavLink className={`${styles.link} text text_type_main-medium`} style={setActive} to="/profile">
          Профиль
        </NavLink>
        <NavLink className={`${styles.link} text text_type_main-medium`} style={setActive} to="/profile/orders">
          История заказов
        </NavLink>
        <NavLink className={`${styles.link} text text_type_main-medium`} style={setActive} to="/">
          Выход
        </NavLink>
        <p className="text text_type_main-default text_color_inactive mt-20" style={{ opacity: "0.4" }}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <form className={styles.form}>
        <span>
          <Input placeholder={"Имя"} value={"Igor"} size={"default"} icon={"EditIcon"}></Input>
        </span>
        <span className="mt-6">
          <Input placeholder={"Логин"} value={"Galdenysh"} size={"default"} icon={"EditIcon"}></Input>
        </span>
        <span className="mt-6">
          <PasswordInput name={"password"} value={valuePassword} onChange={(evt) => setValuePassword(evt.target.value)}></PasswordInput>
        </span>
      </form>
    </section>
  );
};

export default Profile;
