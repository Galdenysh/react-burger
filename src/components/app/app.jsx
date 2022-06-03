import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
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

const App = () => {
  const burderData = useSelector((store) => store.burgerReducer);
  const userData = useSelector((store) => store.authReducer);

  return (
    <>
      <AppHeader />
      <Routes>
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
          path="/profile/"
          element={
            <ProtectedRoute anonymous={false}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/ingredients" element={<Ingredients ingredient={burderData.ingredientSelect} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
