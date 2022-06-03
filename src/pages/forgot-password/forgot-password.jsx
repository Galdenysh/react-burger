import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.scss";
import { forgotPassword } from "../../services/actions/auth";

const ForgotPassword = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const sendEmail = (email) => {
    dispatch(forgotPassword(email));
  };

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={(evt) => evt.preventDefault()}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <span className="mt-6">
          <Input type={"email"} placeholder={"E-mail"} size={"default"} value={value} onChange={(evt) => setValue(evt.target.value)}></Input>
        </span>
        <span className="mt-6">
          <Button type="primary" size="medium" onClick={() => sendEmail(value)}>
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
