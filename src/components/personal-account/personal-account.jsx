import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./personal-account.module.scss";
import { setUserData } from "../../services/actions/auth";

const PersonalAccount = () => {
  const [valuePassword, setValuePassword] = useState("");
  const [valueUserName, setValueUserName] = useState("");
  const [valueEmail, setValueEmail] = useState("");
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.authReducer);

  useEffect(() => {
    setValueUserName(userData.user.name);
    setValueEmail(userData.user.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.user]);

  useEffect(() => {
    valueUserName === userData.user.name && valueEmail === userData.user.email && valuePassword.length === 0 ? setVisible(false) : setVisible(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueUserName, valueEmail, valuePassword]);

  const saveChanges = (userName, email, password) => {
    dispatch(setUserData(userName, email, password));
    setVisible(false);
  };

  const undoChanges = () => {
    setValueUserName(userData.user.name);
    setValueEmail(userData.user.email);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const userName = form.userName.value;
    const email = form.email.value;
    const password = form.password.value;

    saveChanges(userName, email, password);
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
          <Button type="secondary" size="medium" disabled={!visible} onClick={undoChanges} htmlType="button">
            Отмена
          </Button>
          <Button type="primary" size="medium" disabled={!visible}>
            Сохранить
          </Button>
        </div>
      </form>
    </section>
  );
};

export default PersonalAccount;
