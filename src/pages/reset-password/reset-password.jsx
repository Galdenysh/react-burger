import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.scss";
import { resetPassword } from "../../services/actions/auth";

const ResetPassword = () => {
  const [valuePassword, setValuePassword] = useState("");
  const [valueToken, setValueToken] = useState("");
  const dispatch = useDispatch();

  const sendPassword = (password, token) => {
    dispatch(resetPassword(password, token));
  };

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={(evt) => evt.preventDefault()}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <span className="mt-6">
          <PasswordInput name={"password"} value={valuePassword} onChange={(evt) => setValuePassword(evt.target.value)}></PasswordInput>
        </span>
        <span className="mt-6">
          <Input placeholder={"Введите код из письма"} size={"default"} value={valueToken} onChange={(evt) => setValueToken(evt.target.value)}></Input>
        </span>
        <span className="mt-6">
          <Button type="primary" size="medium" onClick={() => sendPassword(valuePassword, valueToken)}>
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
