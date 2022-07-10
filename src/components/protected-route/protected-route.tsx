import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import Preloader from "../preloader/preloader";

interface IProtectedRouteProps {
  anonymous: boolean;
  children: JSX.Element;
}

const ProtectedRoute: FC<IProtectedRouteProps> = (props) => {
  const { anonymous, children } = props;
  const userData = useSelector((store: any) => store.authReducer);
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
