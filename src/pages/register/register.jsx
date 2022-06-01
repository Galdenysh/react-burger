import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.scss";
import { api } from "../../components/api/api";

const Register = () => {
  const [valuePassword, setValuePassword] = useState("");
  const [valueUserName, setValueUserName] = useState("");
  const [valueEmail, setValueEmail] = useState("");

  const register = () => {
    api
      .register(valueEmail, valuePassword, valueUserName)
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
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <span className="mt-6">
          <Input type={"text"} placeholder={"Имя"} size={"default"} value={valueUserName} onChange={(evt) => setValueUserName(evt.target.value)}></Input>
        </span>
        <span className="mt-6">
          <Input type={"email"} placeholder={"E-mail"} size={"default"} value={valueEmail} onChange={(evt) => setValueEmail(evt.target.value)}></Input>
        </span>
        <span className="mt-6">
          <PasswordInput name={"password"} value={valuePassword} onChange={(evt) => setValuePassword(evt.target.value)}></PasswordInput>
        </span>
        <span className="mt-6">
          <Button type="primary" size="medium" onClick={register}>
            Зарегистрироваться
          </Button>
        </span>
      </form>
      <p className="text text_type_main-default mt-20">
        Уже зарегистрированы?{" "}
        <Link className={styles.link} to="/login">
          Войти
        </Link>
      </p>
    </section>
  );
};

export default Register;
