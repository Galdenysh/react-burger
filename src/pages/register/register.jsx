import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.scss";
import { register } from "../../services/actions/auth";

const Register = () => {
  const [valuePassword, setValuePassword] = useState("");
  const [valueUserName, setValueUserName] = useState("");
  const [valueEmail, setValueEmail] = useState("");
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.authReducer);
  const navigate = useNavigate();

  const createUser = (email, password, userName, callback) => {
    dispatch(register(email, password, userName)).then(() => {
      if (!userData.hasErrorAuth) callback();
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const email = form.email.value;
    const password = form.password.value;
    const userName = form.userName.value;

    createUser(email, password, userName, () => navigate("/login"));
  };

  return (
    <main className={styles.content}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <span className="mt-6">
          <Input
            type={"text"}
            name={"userName"}
            placeholder={"Имя"}
            size={"default"}
            value={valueUserName}
            onChange={(evt) => setValueUserName(evt.target.value)}
            error={userData.hasErrorAuth && userData.registerErrorMessage}
            errorText={userData.registerErrorMessage}
          ></Input>
        </span>
        <span className="mt-6">
          <Input
            type={"email"}
            name={"email"}
            placeholder={"E-mail"}
            size={"default"}
            value={valueEmail}
            onChange={(evt) => setValueEmail(evt.target.value)}
            error={userData.hasErrorAuth && userData.registerErrorMessage}
            errorText={userData.registerErrorMessage}
          ></Input>
        </span>
        <span className="mt-6">
          <PasswordInput name={"password"} value={valuePassword} onChange={(evt) => setValuePassword(evt.target.value)}></PasswordInput>
        </span>
        <span className="mt-6">
          <Button type="primary" size="medium" disabled={userData.isLoadingAuth}>
            {userData.isLoadingAuth ? "Идет загрузка..." : "Зарегистрироваться"}
          </Button>
        </span>
      </form>
      <p className="text text_type_main-default mt-20">
        Уже зарегистрированы?{" "}
        <Link className={styles.link} to="/login">
          Войти
        </Link>
      </p>
    </main>
  );
};

export default Register;
