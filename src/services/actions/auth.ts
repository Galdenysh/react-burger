import { api } from "../../components/api/api";
import { errMessage } from "../../utils/errMessage";
import { deleteCookie, setCookie } from "../../utils/cookie";
import { WebSocketAuthAction, wsConnectionClosedAuth, wsConnectionStartAuth } from "./webSocketAuth";
import {
  GET_AUTH_STATUS_FALSE,
  GET_AUTH_STATUS_LOADED,
  GET_AUTH_STATUS_LOADING,
  GET_LOGIN_ERROR_MESSAGE,
  GET_REGISTER_ERROR_MESSAGE,
  GET_RESET_ERROR_MESSAGE,
  GET_USER_STATUS_FALSE,
  GET_USER_STATUS_LOADED,
  GET_USER_STATUS_LOADING,
  LOGGEDIN,
  LOGGEDOUT,
  RESET_PASSWORD_ACCESS,
  SET_AUTH_CHECK,
  SET_USER_DATA,
} from "../constants/auth";
import { Dispatch } from "redux";

export interface ILoggetIn {
  readonly type: typeof LOGGEDIN;
}

export interface ILoggetOut {
  readonly type: typeof LOGGEDOUT;
}

export interface ISetAuthCheck {
  readonly type: typeof SET_AUTH_CHECK;
  readonly payload: boolean;
}

export interface IResetPasswordAccess {
  readonly type: typeof RESET_PASSWORD_ACCESS;
  readonly payload: boolean;
}

export interface ISetUserData {
  readonly type: typeof SET_USER_DATA;
  readonly payload: any;
}

export interface IGetUserStatusLoading {
  readonly type: typeof GET_USER_STATUS_LOADING;
}

export interface IGetUserStatusLoaded {
  readonly type: typeof GET_USER_STATUS_LOADED;
}

export interface IGetUserStatusFalse {
  readonly type: typeof GET_USER_STATUS_FALSE;
}

export interface IGetAuthStatusLoading {
  readonly type: typeof GET_AUTH_STATUS_LOADING;
}

export interface IGetAuthStatusLoaded {
  readonly type: typeof GET_AUTH_STATUS_LOADED;
}

export interface IGetAuthStatusFalse {
  readonly type: typeof GET_AUTH_STATUS_FALSE;
}

export interface IGetRegisterErrorMessage {
  readonly type: typeof GET_REGISTER_ERROR_MESSAGE;
  readonly payload: string;
}

export interface IGetLoginErrorMessage {
  readonly type: typeof GET_LOGIN_ERROR_MESSAGE;
  readonly payload: string;
}

export interface IGetResetErrorMessage {
  readonly type: typeof GET_RESET_ERROR_MESSAGE;
  readonly payload: string;
}

export type AuthAction =
  | ILoggetIn
  | ILoggetOut
  | ISetAuthCheck
  | IResetPasswordAccess
  | ISetUserData
  | IGetUserStatusLoading
  | IGetUserStatusLoaded
  | IGetUserStatusFalse
  | IGetAuthStatusLoading
  | IGetAuthStatusLoaded
  | IGetAuthStatusFalse
  | IGetRegisterErrorMessage
  | IGetLoginErrorMessage
  | IGetResetErrorMessage;

export const fetchGetUserData = () => {
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch(getUserStatusLoading());

    api
      .getUserData()
      .then((data) => {
        if (data.success) {
          dispatch(setUserData(data.user));
          dispatch(getUserStatusLoaded());
        } else {
          setRefreshToken();
        }
      })
      .catch((err) => {
        dispatch(getUserStatusFalse());
        console.log(err.status);
      });
  };
};

export const fetchSetUserData = (userName: string, email: string, password: string) => {
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch(getUserStatusLoading());

    api
      .setUserData({
        name: userName,
        email: email,
        password: password,
      })
      .then((data) => {
        if (data.success) {
          dispatch(setUserData(data.user));
          dispatch(getUserStatusLoaded());
        } else {
          setRefreshToken();
        }
      })
      .catch((err) => {
        dispatch(getUserStatusFalse());
        console.log(err.status);
      });
  };
};

export const register = (email: string, password: string, userName: string) => {
  return (dispatch: Dispatch<AuthAction>) => {
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

export const login = (email: string, password: string) => {
  return (dispatch: Dispatch<AuthAction | WebSocketAuthAction>) => {
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
          dispatch(setUserData(res.user));
          dispatch(getUserStatusLoaded());
          dispatch(wsConnectionStartAuth());
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
  return (dispatch: Dispatch<AuthAction | WebSocketAuthAction>) => {
    return api
      .logout()
      .then((res) => {
        if (res.success) {
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
          dispatch(loggedOut());
          dispatch(wsConnectionClosedAuth());
        }
      })
      .catch((err) => {
        console.log(err.status);
      });
  };
};

export const forgotPassword = (email: string) => {
  return (dispatch: Dispatch<AuthAction>) => {
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

export const resetPassword = (password: string, token: string) => {
  return (dispatch: Dispatch<AuthAction>) => {
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
  return (dispatch: Dispatch<AuthAction>) => {
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

export const setAuthCheck = (payload: boolean) => {
  return {
    type: SET_AUTH_CHECK,
    payload,
  };
};

export const resetPasswordAccess = (payload: boolean) => {
  return {
    type: RESET_PASSWORD_ACCESS,
    payload,
  };
};

export const setUserData = (payload: any) => {
  return {
    type: SET_USER_DATA,
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

export const getRegisterErrorMessage = (payload: string) => {
  return {
    type: GET_REGISTER_ERROR_MESSAGE,
    payload,
  };
};

export const getLoginErrorMessage = (payload: string) => {
  return {
    type: GET_LOGIN_ERROR_MESSAGE,
    payload,
  };
};

export const getResetErrorMessage = (payload: string) => {
  return {
    type: GET_RESET_ERROR_MESSAGE,
    payload,
  };
};
