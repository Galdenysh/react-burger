import { FC, ReactNode, useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import Preloader from "../preloader/preloader";

interface IProtectedRouteProps {
  anonymous: boolean;
  children: any;
}

const ProtectedRoute: FC<IProtectedRouteProps> = (props) => {
  const { anonymous, children } = props;
  const userData = useSelector((store: any) => store.authReducer);
  const location = useLocation();
  // const fromPage = location.state?.from?.pathname || "/";
  const fromPage = useMemo(() => {
    const state = location.state as { from: Location };

    if (state && state.from) {
      return state.from;
    }

    return "/";
  }, [location]);

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
