import { FC, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.scss";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { forgotPassword } from "../../services/actions/auth";

const ForgotPassword: FC = () => {
  const [valueEmail, setValueEmail] = useState("");
  const dispatch = useTypedDispatch();
  const userData = useTypedSelector((store) => store.auth);
  const navigate = useNavigate();

  const sendEmail = (email: string, callback: () => void) => {
    const checkError = async () => dispatch(forgotPassword(email));

    checkError().then(() => {
      if (!userData.hasErrorUser) callback();
    });
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    sendEmail(valueEmail, () => navigate("/reset-password"));
  };

  return (
    <main className={styles.content}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <span className="mt-6">
          <Input
            type={"email"}
            name={"email"}
            placeholder={"E-mail"}
            size={"default"}
            value={valueEmail}
            onChange={(evt) => setValueEmail(evt.target.value)}
          ></Input>
        </span>
        <span className="mt-6">
          {/* @ts-ignore */}
          <Button type="primary" size="medium" disabled={userData.isLoadingAuth}>
            {userData.isLoadingAuth ? "Идет загрузка..." : "Восстановить"}
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

export default ForgotPassword;
