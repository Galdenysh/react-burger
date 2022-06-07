import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Preloader from "../preloader/preloader";

const ProtectedRoute = ({ anonymous, children }) => {
  const userData = useSelector((store) => store.authReducer);
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/";

  if (!userData.isAuthChecked) {
    return <Preloader type={"preloader"} />;
  }

  if (!anonymous && !userData.loggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (anonymous && userData.loggedIn) {
    return <Navigate to={fromPage} />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  anonymous: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

export default ProtectedRoute;
