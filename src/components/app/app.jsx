import { useSelector } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";
import AppHeader from "../app-header/app-header.jsx";
import Login from "../../pages/login/login.jsx";
import Register from "../../pages/register/register.jsx";
import ForgotPassword from "../../pages/forgot-password/forgot-password.jsx";
import ResetPassword from "../../pages/reset-password/reset-password.jsx";
import Profile from "../../pages/profile/profile.jsx";
import Ingredients from "../../pages/ingredients/ingredients.jsx";
import NotFoundPage from "../../pages/not-found-page/not-found-page.jsx";
import Main from "../../pages/main/main.jsx";

const App = () => {
  const burderData = useSelector((store) => store.burgerReducer);

  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/ingredients" element={<Ingredients ingredient={burderData.ingredientSelect} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
