import React from "react";
import { Link } from "react-router-dom";
import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.scss";

const Profile = () => {
  const [value, setValue] = React.useState("password");
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <section className={styles.container}>
      <div className={`${styles.menu} mr-15`}>
        <Link className={`${styles.link} ${styles.link_active} text text_type_main-medium`} to="/profile">
          Профиль
        </Link>
        <Link className={`${styles.link} text text_type_main-medium`} to="/profile/orders">
          История заказов
        </Link>
        <Link className={`${styles.link} text text_type_main-medium`} to="/">
          Выход
        </Link>
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
          <PasswordInput onChange={onChange} value={value} name={"password"}></PasswordInput>
        </span>
      </form>
    </section>
  );
};

export default Profile;
