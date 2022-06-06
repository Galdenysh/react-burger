import { useSelector } from "react-redux";
import PersonalAccount from "../../components/personal-account/personal-account";
import Preloader from "../../components/preloader/preloader";
import styles from "./profile.module.scss";

const Profile = () => {
  const userData = useSelector((store) => store.authReducer);

  return (
    <main className={styles.content}>
      {userData.isLoadingUser && <Preloader type={"preloader"} />}
      {userData.hasErrorUser && <Preloader type={"error"} />}
      {!userData.isLoadingUser && !userData.hasErrorUser && <PersonalAccount />}
    </main>
  );
};

export default Profile;
