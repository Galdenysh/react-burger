import React from "react";
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
        <a className={`${styles.link} text text_type_main-medium text_color_inactive`} href="#">
          Профиль
        </a>
        <a className={`${styles.link} text text_type_main-medium text_color_inactive`} href="#">
          История заказов
        </a>
        <a className={`${styles.link} text text_type_main-medium text_color_inactive`} href="#">
          Выход
        </a>
        <p className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете изменить свои персональные данные</p>
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
