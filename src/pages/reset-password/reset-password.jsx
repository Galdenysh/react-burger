import React from "react";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.scss";

const ForgotPasswordTwo = () => {
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
        <a className={styles.link} href="#">
          Войти
        </a>
      </p>
    </section>
  );
};

export default ForgotPasswordTwo;
