import { api } from "../../components/api/api";
import { setCookie } from "../../utils/setCookie";

export const LOGGEDIN = "LOGGEDIN";
export const LOGGEDOUT = "LOGGEDOUT";
export const RESET_PASSWORD_ACCESS = "RESET_PASSWORD_ACCESS";
export const SET_USER_DATA = "SET_USER_DATA";
export const GET_USER_STATUS_LOADING = "GET_USER_STATUS_LOADING";
export const GET_USER_STATUS_LOADED = "GET_USER_STATUS_LOADED";
export const GET_USER_STATUS_FALSE = "GET_USER_STATUS_FALSE";
export const GET_ERROR_MESSAGE = "GET_ERROR_MESSAGE";

export const getUserData = () => {
  return (dispatch) => {
    dispatch({ type: GET_USER_STATUS_LOADING });

    api
      .getUserData()
      .then((data) => {
        if (data.success) {
          dispatch({ type: SET_USER_DATA, payload: data.user });
          dispatch({ type: GET_USER_STATUS_LOADED });
        }
      })
      .catch((err) => {
        dispatch({ type: GET_USER_STATUS_FALSE });
        console.log(err.status);
      });
  };
};

export const setUserData = (userName, email, password) => {
  return (dispatch) => {
    dispatch({ type: GET_USER_STATUS_LOADING });

    api
      .setUserData({
        name: userName,
        email: email,
        password: password,
      })
      .then((data) => {
        if (data.success) {
          dispatch({ type: SET_USER_DATA, payload: data.user });
          dispatch({ type: GET_USER_STATUS_LOADED });
        }
      })
      .catch((err) => {
        dispatch({ type: GET_USER_STATUS_FALSE });
        console.log(err.status);
      });
  };
};

export const register = (email, password, userName) => {
  return (dispatch) => {
    api
      .register({
        email: email,
        password: password,
        name: userName,
      })
      .catch((err) => {
        console.log(err.status);
      });
  };
};

export const login = (email, password, callback) => {
  return (dispatch) => {
    dispatch({ type: GET_USER_STATUS_LOADING });

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
            setCookie("accessToken", accessToken);
          }

          if (refreshToken) {
            setCookie("refreshToken", refreshToken);
          }

          dispatch({ type: LOGGEDIN });
          dispatch({ type: GET_USER_STATUS_LOADED });
          callback();
        }
      })
      .catch((err) => {
        dispatch({ type: GET_USER_STATUS_FALSE });
        console.log(err.status);

        const errMessage = async () => {
          let res = await err.err;
          dispatch({ type: GET_ERROR_MESSAGE, payload: res.message });
        };

        errMessage();
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    api
      .logout()
      .then((res) => {
        if (res.success) {
          dispatch({ type: LOGGEDOUT });
        }
      })
      .catch((err) => {
        console.log(err.status);
      });
  };
};

export const forgotPassword = (email, callback) => {
  return (dispatch) => {
    dispatch({ type: GET_USER_STATUS_LOADING });

    api
      .forgotPassword({
        email: email,
      })
      .then((res) => {
        if (res.success) {
          dispatch({ type: GET_USER_STATUS_LOADED });
          dispatch({ type: RESET_PASSWORD_ACCESS, payload: true });
          callback();
        }
      })
      .catch((err) => {
        dispatch({ type: GET_USER_STATUS_FALSE });
        console.log(err.status);
      });
  };
};

export const resetPassword = (password, token, callback) => {
  return (dispatch) => {
    dispatch({ type: GET_USER_STATUS_LOADING });

    api
      .resetPassword({
        password: password,
        token: token,
      })
      .then((res) => {
        if (res.success) {
          dispatch({ type: GET_USER_STATUS_LOADED });
          callback();
          dispatch({ type: RESET_PASSWORD_ACCESS, payload: false });
        }
      })
      .catch((err) => {
        dispatch({ type: GET_USER_STATUS_FALSE });
        console.log(err.status);
      });
  };
};
