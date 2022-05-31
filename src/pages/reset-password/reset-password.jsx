import React from "react";
import { Link } from "react-router-dom";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.scss";

const ResetPassword = () => {
  const [value, setValue] = React.useState("password");
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <section className={styles.container}>
      <form className={styles.form}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <span className="mt-6">
          <PasswordInput onChange={onChange} name={"password"}></PasswordInput>
        </span>
        <span className="mt-6">
          <Input placeholder={"Введите код из письма"} size={"default"}></Input>
        </span>
        <span className="mt-6">
          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </span>
      </form>
      <p className="text text_type_main-default mt-20">
        Вспомнили пароль?{" "}
        <Link className={styles.link} to="/login">
          Войти
        </Link>
      </p>
    </section>
  );
};

export default ResetPassword;