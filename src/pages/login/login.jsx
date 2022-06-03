import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.scss";
import { login } from "../../services/actions/auth";

const Login = () => {
  const [valueEmail, setValueEmail] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.authReducer);

  const enter = (valueEmail, valuePassword) => {
    dispatch(login(valueEmail, valuePassword));
  };

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={(evt) => evt.preventDefault()}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <span className="mt-6">
          <Input
            type={"email"}
            placeholder={"E-mail"}
            size={"default"}
            value={valueEmail}
            onChange={(evt) => setValueEmail(evt.target.value)}
            error={userData.hasError ? true : false}
            errorText={userData.errorMessage}
          ></Input>
        </span>
        <span className="mt-6">
          <PasswordInput name={"password"} value={valuePassword} onChange={(evt) => setValuePassword(evt.target.value)}></PasswordInput>
        </span>
        <span className="mt-6">
          <Button type="primary" size="medium" onClick={() => enter(valueEmail, valuePassword)} disabled={userData.isLoading ? "disabled" : ""}>
            Войти
          </Button>
        </span>
      </form>
      <p className="text text_type_main-default mt-20">
        Вы — новый пользователь?{" "}
        <Link className={styles.link} to="/register">
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default mt-4">
        Забыли пароль?{" "}
        <Link className={styles.link} to="/forgot-password">
          Восстановить пароль
        </Link>
      </p>
    </section>
  );
};

export default Login;
