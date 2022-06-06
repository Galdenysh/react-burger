import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.scss";
import { forgotPassword } from "../../services/actions/auth";

const ForgotPassword = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.authReducer);
  const navigate = useNavigate();

  const sendEmail = (email, callback) => {
    dispatch(forgotPassword(email, callback));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const email = form.email.value;

    sendEmail(email, () => navigate("/reset-password"));
  };

  return (
    <main className={styles.content}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <span className="mt-6">
          <Input type={"email"} name={"email"} placeholder={"E-mail"} size={"default"} value={value} onChange={(evt) => setValue(evt.target.value)}></Input>
        </span>
        <span className="mt-6">
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
