import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PersonalAccount from "../../components/personal-account/personal-account";
import styles from "./profile.module.scss";
import { getUserData } from "../../services/actions/auth";

const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.authReducer);

  useEffect(() => {
    dispatch(getUserData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={styles.content}>
      {userData.isLoading && <p className={`${styles.download} text text_type_main-large`}>Загрузка...</p>}
      {userData.hasError && <p className={`${styles.download} text text_type_main-large`}>Произошла ошибка...</p>}
      {!userData.isLoading && !userData.hasError && <PersonalAccount />}
    </main>
  );
};

export default Profile;
