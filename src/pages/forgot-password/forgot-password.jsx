import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { api } from "../../components/api/api";
import styles from "./forgot-password.module.scss";

const ForgotPassword = () => {
  const [value, setValue] = useState("");

  const forgotPassword = () => {
    api
      .forgotPassword(value)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={(evt) => evt.preventDefault()}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <span className="mt-6">
          <Input type={"email"} placeholder={"E-mail"} size={"default"} value={value} onChange={(evt) => setValue(evt.target.value)}></Input>
        </span>
        <span className="mt-6">
          <Button type="primary" size="medium" onClick={forgotPassword}>
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
