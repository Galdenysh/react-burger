import { useSelector } from "react-redux";
import PersonalAccount from "../../components/personal-account/personal-account";
import styles from "./profile.module.scss";

const Profile = () => {
  const userData = useSelector((store) => store.authReducer);

  return (
    <main className={styles.content}>
      {userData.isLoadingUser && <p className={`${styles.download} text text_type_main-large`}>Загрузка...</p>}
      {userData.hasErrorUser && <p className={`${styles.download} text text_type_main-large`}>Произошла ошибка...</p>}
      {!userData.isLoadingUser && !userData.hasErrorUser && <PersonalAccount />}
    </main>
  );
};

export default Profile;
