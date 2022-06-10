import { api } from "../../components/api/api";
import { errMessage } from "../../utils/errMessage";
import { deleteCookie, setCookie } from "../../utils/cookie";

export const LOGGEDIN = "LOGGEDIN";
export const LOGGEDOUT = "LOGGEDOUT";
export const SET_AUTH_CHECK = "SET_AUTH_CHECK";
export const RESET_PASSWORD_ACCESS = "RESET_PASSWORD_ACCESS";
export const SET_USER_DATA = "SET_USER_DATA";
export const GET_USER_STATUS_LOADING = "GET_USER_STATUS_LOADING";
export const GET_USER_STATUS_LOADED = "GET_USER_STATUS_LOADED";
export const GET_USER_STATUS_FALSE = "GET_USER_STATUS_FALSE";
export const GET_AUTH_STATUS_LOADING = "GET_AUTH_STATUS_LOADING";
export const GET_AUTH_STATUS_LOADED = "GET_AUTH_STATUS_LOADED";
export const GET_AUTH_STATUS_FALSE = "GET_AUTH_STATUS_FALSE";
export const GET_REGISTER_ERROR_MESSAGE = "GET_REGISTER_ERROR_MESSAGE";
export const GET_LOGIN_ERROR_MESSAGE = "GET_LOGIN_ERROR_MESSAGE";
export const GET_RESET_ERROR_MESSAGE = "GET_RESET_ERROR_MESSAGE";

export const getUserData = () => {
  return (dispatch) => {
    dispatch(getUserStatusLoading());

    api
      .getUserData()
      .then((data) => {
        if (data.success) {
          dispatch({ type: SET_USER_DATA, payload: data.user });
          dispatch(getUserStatusLoaded());
        } else {
          dispatch(setRefreshToken());
        }
      })
      .catch((err) => {
        dispatch(getUserStatusFalse());
        console.log(err.status);
      });
  };
};

export const setUserData = (userName, email, password) => {
  return (dispatch) => {
    dispatch(getUserStatusLoading());

    api
      .setUserData({
        name: userName,
        email: email,
        password: password,
      })
      .then((data) => {
        if (data.success) {
          dispatch({ type: SET_USER_DATA, payload: data.user });
          dispatch(getUserStatusLoaded());
        } else {
          dispatch(setRefreshToken());
        }
      })
      .catch((err) => {
        dispatch(getUserStatusFalse());
        console.log(err.status);
      });
  };
};

export const register = (email, password, userName) => {
  return (dispatch) => {
    dispatch(getAuthStatusLoading());

    return api
      .register({
        email: email,
        password: password,
        name: userName,
      })
      .then((res) => {
        if (res.success) {
          dispatch(getAuthStatusLoaded());
        }
      })
      .catch((err) => {
        dispatch(getAuthStatusFalse());
        errMessage(err, dispatch, getRegisterErrorMessage);
        console.log(err.status);
      });
  };
};

export const login = (email, password) => {
  return (dispatch) => {
    dispatch(getAuthStatusLoading());

    api
      .login({
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.success) {
          let accessToken;
          let refreshToken;

          if (res.accessToken.indexOf("Bearer") === 0) {
            accessToken = res.accessToken.split("Bearer ")[1];
          }
          refreshToken = res.refreshToken;

          if (accessToken) {
            setCookie("accessToken", accessToken, { expires: 1200 });
          }

          if (refreshToken) {
            setCookie("refreshToken", refreshToken);
          }

          dispatch(loggedIn());
          dispatch(getAuthStatusLoaded());
          dispatch({ type: SET_USER_DATA, payload: res.user });
          dispatch(getUserStatusLoaded());
        }
      })
      .catch((err) => {
        dispatch(getAuthStatusFalse());
        dispatch(getUserStatusFalse());
        errMessage(err, dispatch, getLoginErrorMessage);
        console.log(err.status);
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    return api
      .logout()
      .then((res) => {
        if (res.success) {
          deleteCookie("accessToken", null, { expires: -1 });
          deleteCookie("refreshToken", null, { expires: -1 });
          dispatch(loggedOut());
        }
      })
      .catch((err) => {
        console.log(err.status);
      });
  };
};

export const forgotPassword = (email) => {
  return (dispatch) => {
    dispatch(getAuthStatusLoading());

    return api
      .forgotPassword({
        email: email,
      })
      .then((res) => {
        if (res.success) {
          dispatch(getAuthStatusLoaded());
          dispatch(resetPasswordAccess(true));
        }
      })
      .catch((err) => {
        dispatch(getAuthStatusFalse());
        console.log(err.status);
      });
  };
};

export const resetPassword = (password, token) => {
  return (dispatch) => {
    dispatch(getAuthStatusLoading());

    return api
      .resetPassword({
        password: password,
        token: token,
      })
      .then((res) => {
        if (res.success) {
          dispatch(getAuthStatusLoaded());
          dispatch(resetPasswordAccess(false));
        }
      })
      .catch((err) => {
        dispatch(getAuthStatusFalse());
        errMessage(err, dispatch, getResetErrorMessage);
        console.log(err.status);
      });
  };
};

export const setRefreshToken = () => {
  return (dispatch) => {
    dispatch(setAuthCheck(false));

    return api
      .setRefreshToken()
      .then((res) => {
        if (res.success) {
          let accessToken;
          let refreshToken;

          if (res.accessToken.indexOf("Bearer") === 0) {
            accessToken = res.accessToken.split("Bearer ")[1];
          }
          refreshToken = res.refreshToken;

          if (accessToken) {
            setCookie("accessToken", accessToken, { expires: 1200 });
          }

          if (refreshToken) {
            setCookie("refreshToken", refreshToken);
          }

          dispatch(loggedIn());
          dispatch(setAuthCheck(true));
        }
      })
      .catch((err) => {
        dispatch(loggedOut());
        dispatch(setAuthCheck(true));
        console.log(err.status);
      });
  };
};

export const loggedIn = () => {
  return {
    type: LOGGEDIN,
  };
};

export const loggedOut = () => {
  return {
    type: LOGGEDOUT,
  };
};

export const setAuthCheck = (payload) => {
  return {
    type: SET_AUTH_CHECK,
    payload,
  };
};

export const resetPasswordAccess = (payload) => {
  return {
    type: RESET_PASSWORD_ACCESS,
    payload,
  };
};

export const getUserStatusLoading = () => {
  return {
    type: GET_USER_STATUS_LOADING,
  };
};

export const getUserStatusLoaded = () => {
  return {
    type: GET_USER_STATUS_LOADED,
  };
};

export const getUserStatusFalse = () => {
  return {
    type: GET_USER_STATUS_FALSE,
  };
};

export const getAuthStatusLoading = () => {
  return {
    type: GET_AUTH_STATUS_LOADING,
  };
};

export const getAuthStatusLoaded = () => {
  return {
    type: GET_AUTH_STATUS_LOADED,
  };
};

export const getAuthStatusFalse = () => {
  return {
    type: GET_AUTH_STATUS_FALSE,
  };
};

export const getRegisterErrorMessage = (payload) => {
  return {
    type: GET_REGISTER_ERROR_MESSAGE,
    payload,
  };
};

export const getLoginErrorMessage = (payload) => {
  return {
    type: GET_LOGIN_ERROR_MESSAGE,
    payload,
  };
};

export const getResetErrorMessage = (payload) => {
  return {
    type: GET_RESET_ERROR_MESSAGE,
    payload,
  };
};
