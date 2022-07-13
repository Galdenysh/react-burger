import { FC, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.scss";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { login } from "../../services/actions/auth";

const Login: FC = () => {
  const [valueEmail, setValueEmail] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const dispatch = useTypedDispatch();
  const userData = useTypedSelector((store) => store.auth);

  const signIn = (email: string, password: string) => {
    dispatch(login(email, password));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    signIn(valueEmail, valuePassword);
  };

  return (
    <main className={styles.content}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <span className="mt-6">
          <Input
            type={"email"}
            name={"email"}
            placeholder={"E-mail"}
            size={"default"}
            value={valueEmail}
            onChange={(evt) => setValueEmail(evt.target.value)}
            error={userData.hasErrorAuth}
            errorText={userData.loginErrorMessage}
          ></Input>
        </span>
        <span className="mt-6">
          <PasswordInput
            name={"password"}
            value={valuePassword}
            onChange={(evt) => setValuePassword(evt.target.value)}
          ></PasswordInput>
        </span>
        <span className="mt-6">
          {/* @ts-ignore */}
          <Button type="primary" size="medium" disabled={userData.isLoadingAuth}>
            {userData.isLoadingAuth ? "Идет загрузка..." : "Вход"}
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
    </main>
  );
};

export default Login;
