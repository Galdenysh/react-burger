import { useState, useEffect, FC, FormEvent } from "react";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./personal-account.module.scss";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { fetchSetUserData } from "../../services/actions/auth";

const PersonalAccount: FC = () => {
  const [valuePassword, setValuePassword] = useState("");
  const [valueUserName, setValueUserName] = useState("");
  const [valueEmail, setValueEmail] = useState("");
  const [visible, setVisible] = useState(false);
  const dispatch = useTypedDispatch();
  const userData = useTypedSelector((store) => store.auth);

  useEffect(() => {
    if (userData.user !== null) {
      setValueUserName(userData.user.name);
      setValueEmail(userData.user.email);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.user]);

  useEffect(() => {
    if (userData.user !== null)
      valueUserName === userData.user.name && valueEmail === userData.user.email && valuePassword.length === 0
        ? setVisible(false)
        : setVisible(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueUserName, valueEmail, valuePassword]);

  const saveChanges = (userName: string, email: string, password: string) => {
    dispatch(fetchSetUserData(userName, email, password));
    setVisible(false);
  };

  const undoChanges = () => {
    if (userData.user !== null) {
      setValueUserName(userData.user.name);
      setValueEmail(userData.user.email);
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    saveChanges(valueUserName, valueEmail, valuePassword);
  };

  return (
    <section className={styles.personalAccount}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <span>
          <Input
            type={"text"}
            name={"userName"}
            placeholder={"Имя"}
            size={"default"}
            icon={"EditIcon"}
            value={valueUserName}
            onChange={(evt) => setValueUserName(evt.target.value)}
          ></Input>
        </span>
        <span className="mt-6">
          <Input
            type={"email"}
            name={"email"}
            placeholder={"Логин"}
            size={"default"}
            icon={"EditIcon"}
            value={valueEmail}
            onChange={(evt) => setValueEmail(evt.target.value)}
          ></Input>
        </span>
        <span className="mt-6">
          <Input
            type={"password"}
            name={"password"}
            placeholder={"Пароль"}
            size={"default"}
            icon={"EditIcon"}
            value={valuePassword}
            onChange={(evt) => setValuePassword(evt.target.value)}
          ></Input>
        </span>
        <div className={`${styles.buttons} mt-6`} style={{ opacity: visible ? "1" : "0" }}>
          {/* @ts-ignore */}
          <Button type="secondary" size="medium" disabled={!visible} onClick={undoChanges} htmlType="button">
            Отмена
          </Button>
          {/* @ts-ignore */}
          <Button type="primary" size="medium" disabled={!visible}>
            Сохранить
          </Button>
        </div>
      </form>
    </section>
  );
};

export default PersonalAccount;
