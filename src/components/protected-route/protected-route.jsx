import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./protected-route.module.scss";

const ProtectedRoute = ({ anonymous, children }) => {
  const userData = useSelector((store) => store.authReducer);
  const location = useLocation();

  if (!userData.isAuthChecked) {
    return (
      <main className={styles.content}>
        <p className={`${styles.download} text text_type_main-large`}>Загрузка...</p>
      </main>
    );
  }

  if (!anonymous && !userData.loggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (anonymous && userData.loggedIn) {
    return <Navigate to="/" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  anonymous: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

export default ProtectedRoute;
