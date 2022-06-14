import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styles from "./nav-profile.module.scss";
import { logout } from "../../services/actions/auth";

const links = {
  profile: "/profile",
  orders: "/profile/orders",
};

const NavProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.authReducer);
  const location = useLocation();

  const setActive = ({ isActive }) => {
    return { color: isActive ? "#f2f2f3" : "#8585ad" };
  };

  const exit = () => {
    dispatch(logout()).then(() => {
      if (!userData.loggenIn) navigate("/login");
    });
  };

  return (
    <section className={`${styles.navProfile} mr-15`}>
      <NavLink className={`${styles.link} text text_type_main-medium`} style={setActive} to={links.profile} end>
        Профиль
      </NavLink>
      <NavLink className={`${styles.link} text text_type_main-medium`} style={setActive} to={links.orders}>
        История заказов
      </NavLink>
      <NavLink className={`${styles.link} text text_type_main-medium`} to="" onClick={exit}>
        Выход
      </NavLink>
      {location.pathname === links.profile && (
        <p className="text text_type_main-default text_color_inactive mt-20" style={{ opacity: "0.4" }}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      )}
      {location.pathname === links.orders && (
        <p className="text text_type_main-default text_color_inactive mt-20" style={{ opacity: "0.4" }}>
          В этом разделе вы можете просмотреть свою историю заказов
        </p>
      )}
    </section>
  );
};

export default NavProfile;