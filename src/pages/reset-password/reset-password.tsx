import { FC, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.scss";
import { resetPassword } from "../../services/actions/auth";

const ResetPassword: FC = () => {
  const [valuePassword, setValuePassword] = useState("");
  const [valueToken, setValueToken] = useState("");
  const dispatch = useDispatch();
  const userData = useSelector((store: any) => store.authReducer);
  const navigate = useNavigate();

  const sendPassword = (password: string, token: string, callback: () => void) => {
    // @ts-ignore
    dispatch(resetPassword(password, token)).then(() => {
      if (!userData.hasErrorUser) callback();
    });
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    sendPassword(valuePassword, valueToken, () => navigate("/login"));
  };

  return (
    <main className={styles.content}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <span className="mt-6">
          <PasswordInput
            name={"password"}
            value={valuePassword}
            onChange={(evt) => setValuePassword(evt.target.value)}
          ></PasswordInput>
        </span>
        <span className="mt-6">
          <Input
            type={"text"}
            name={"token"}
            placeholder={"Введите код из письма"}
            size={"default"}
            value={valueToken}
            onChange={(evt) => setValueToken(evt.target.value)}
            error={userData.hasErrorAuth && userData.resetErrorMessage}
            errorText={userData.resetErrorMessage}
          ></Input>
        </span>
        <span className="mt-6">
          {/* @ts-ignore */}
          <Button type="primary" size="medium" disabled={userData.isLoadingAuth}>
            {userData.isLoadingAuth ? "Идет загрузка..." : "Сохранить"}
          </Button>
        </span>
      </form>
      <p className="text text_type_main-default mt-20">
        Вспомнили пароль?{" "}
        <Link className={styles.link} to="/login">
          Войти
        </Link>
      </p>
    </main>
  );
};

export default ResetPassword;
