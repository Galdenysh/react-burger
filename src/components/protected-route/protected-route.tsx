import { FC } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Preloader from "../preloader/preloader";

interface ProtectedRouteProps {
  anonymous: boolean;
  children: JSX.Element;
}

const ProtectedRoute: FC<ProtectedRouteProps> = (props) => {
  const { anonymous, children } = props;
  const userData = useTypedSelector((store) => store.auth);
  const location = useLocation();
  const state = location.state as { from: Location };
  const fromPage = state?.from?.pathname || "/";

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

export default ProtectedRoute;
