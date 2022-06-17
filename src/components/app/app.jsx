import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import AppHeader from "../app-header/app-header.jsx";
import Login from "../../pages/login/login.jsx";
import Register from "../../pages/register/register.jsx";
import ForgotPassword from "../../pages/forgot-password/forgot-password.jsx";
import ResetPassword from "../../pages/reset-password/reset-password.jsx";
import Profile from "../../pages/profile/profile.jsx";
import Ingredients from "../../pages/ingredients/ingredients.jsx";
import NotFoundPage from "../../pages/not-found-page/not-found-page.jsx";
import Main from "../../pages/main/main.jsx";
import ProtectedRoute from "../protected-route/protected-route.jsx";
import Modal from "../modal/modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";
import Feed from "../../pages/feed/feed.jsx";
import FeedDetails from "../../pages/feed-details/feed-details.jsx";
import OrderInfo from "../order-info/order-info.jsx";
import Preloader from "../preloader/preloader.jsx";
import { getCookie } from "../../utils/cookie.js";
import { getUserData, setAuthCheck, setRefreshToken } from "../../services/actions/auth.js";
import { getIngredients } from "../../services/actions/burger.js";

const App = () => {
  const userData = useSelector((store) => store.authReducer);
  const burderData = useSelector((store) => store.burgerReducer);
  const feedData = useSelector((store) => store.webSocketReducer);
  const feedDataAuth = useSelector((store) => store.webSocketReducerAuth);
  const location = useLocation();
  const background = location.state?.background;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const closePopup = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(setAuthCheck(false));
    dispatch(getIngredients());
    dispatch(setRefreshToken()).then(() => {
      if (getCookie("accessToken")) {
        dispatch(getUserData());
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<Main />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute anonymous={true}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute anonymous={true}>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute anonymous={true}>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRoute anonymous={true}>
              {userData.resetPasswordAccess ? <ResetPassword /> : <Navigate to="/forgot-password" replace={true} />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/*"
          element={
            <ProtectedRoute anonymous={false}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/orders/:id"
          element={
            <ProtectedRoute anonymous={false}>
              <FeedDetails wsAuth={true} />
            </ProtectedRoute>
          }
        />
        <Route path="/ingredients/:id" element={<Ingredients />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/feed/:id" element={<FeedDetails wsAuth={false} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal closePopup={closePopup}>
                {burderData.isLoading && <Preloader type={"preloader"} style={{ minHeight: "506px" }} />}
                {burderData.hasError && <Preloader type={"error"} style={{ minHeight: "506px" }} />}
                {!burderData.isLoading && !burderData.hasError && burderData.ingredientsData.length && <IngredientDetails />}
              </Modal>
            }
          />
          <Route
            path="/feed/:id"
            element={
              <Modal closePopup={closePopup}>
                {!feedData.wsConnected && burderData.isLoading && !feedData.messages.length && <Preloader type={"preloader"} style={{ minHeight: "506px" }} />}
                {feedData.error && burderData.hasError && <Preloader type={"error"} style={{ minHeight: "506px" }} />}
                {feedData.wsConnected &&
                  !feedData.error &&
                  !!feedData.messages.length &&
                  !burderData.isLoading &&
                  !burderData.hasError &&
                  !!burderData.ingredientsData.length && <OrderInfo wsAuth={false} />}
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:id"
            element={
              <Modal closePopup={closePopup}>
                {!feedDataAuth.wsConnected && burderData.isLoading && !feedDataAuth.messages.length && (
                  <Preloader type={"preloader"} style={{ minHeight: "506px" }} />
                )}
                {feedDataAuth.error && burderData.hasError && <Preloader type={"error"} style={{ minHeight: "506px" }} />}
                {feedDataAuth.wsConnected &&
                  !feedDataAuth.error &&
                  !!feedDataAuth.messages.length &&
                  !burderData.isLoading &&
                  !burderData.hasError &&
                  !!burderData.ingredientsData.length && <OrderInfo wsAuth={true} />}
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
