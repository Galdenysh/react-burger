import React from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.scss";

const ForgotPassword = () => {
  return (
    <section className={styles.container}>
      <form className={styles.form}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <span className="mt-6">
          <Input placeholder={"E-mail"} size={"default"}></Input>
        </span>
        <span className="mt-6">
          <Button type="primary" size="medium">
            Восстановить
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

export default ForgotPassword;