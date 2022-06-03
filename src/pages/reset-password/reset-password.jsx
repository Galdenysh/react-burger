import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.scss";
import { resetPassword } from "../../services/actions/auth";

const ResetPassword = () => {
  const [valuePassword, setValuePassword] = useState("");
  const [valueToken, setValueToken] = useState("");
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.authReducer);
  const navigate = useNavigate();

  const sendPassword = (password, token, callback) => {
    dispatch(resetPassword(password, token, callback));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const password = form.password.value;
    const token = form.token.value;

    sendPassword(password, token, () => navigate("/login"));
  };

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <span className="mt-6">
          <PasswordInput name={"password"} value={valuePassword} onChange={(evt) => setValuePassword(evt.target.value)}></PasswordInput>
        </span>
        <span className="mt-6">
          <Input
            type={"text"}
            name={"token"}
            placeholder={"Введите код из письма"}
            size={"default"}
            value={valueToken}
            onChange={(evt) => setValueToken(evt.target.value)}
          ></Input>
        </span>
        <span className="mt-6">
          <Button type="primary" size="medium" disabled={userData.isLoading}>
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
