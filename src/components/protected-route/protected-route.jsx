import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

const ProtectedRoute = ({ anonymous, children }) => {
  const userData = useSelector((store) => store.authReducer);
  const location = useLocation();

  if (!anonymous && !userData.loggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (anonymous && userData.loggedIn) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
