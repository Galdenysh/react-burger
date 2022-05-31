import React from "react";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.scss";

const Login = () => {
  const [value, setValue] = React.useState("password");
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <section className={styles.container}>
      <form className={styles.form}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <span className="mt-6">
          <Input placeholder={"E-mail"} size={"default"}></Input>
        </span>
        <span className="mt-6">
          <PasswordInput onChange={onChange} value={value} name={"password"}></PasswordInput>
        </span>
        <span className="mt-6">
          <Button type="primary" size="medium">
            Войти
          </Button>
        </span>
      </form>
      <p className="text text_type_main-default mt-20">
        Вы — новый пользователь?{" "}
        <a className={styles.link} href="#">
          Зарегистрироваться
        </a>
      </p>
      <p className="text text_type_main-default mt-4">
        Забыли пароль?{" "}
        <a className={styles.link} href="#">
          Восстановить пароль
        </a>
      </p>
    </section>
  );
};

export default Login;
