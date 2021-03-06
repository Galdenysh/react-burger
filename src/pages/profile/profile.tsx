import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import NavProfile from "../../components/nav-profile/nav-profile";
import PersonalAccount from "../../components/personal-account/personal-account";
import Preloader from "../../components/preloader/preloader";
import NotFoundPage from "../not-found-page/not-found-page";
import styles from "./profile.module.scss";
import OrderHistory from "../order-history/order-history";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const Profile: FC = () => {
  const userData = useTypedSelector((store) => store.auth);

  return (
    <>
      {userData.isLoadingUser && <Preloader type={"preloader"} />}
      {userData.hasErrorUser && <Preloader type={"error"} />}
      {!userData.isLoadingUser && !userData.hasErrorUser && (
        <main className={styles.content}>
          <NavProfile />
          <Routes>
            <Route path="/" element={<PersonalAccount />} />
            <Route path="/orders/*" element={<OrderHistory />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      )}
    </>
  );
};

export default Profile;
