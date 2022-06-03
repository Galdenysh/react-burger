import {
  LOGGEDIN,
  SET_USER_DATA,
  GET_USER_STATUS_LOADING,
  GET_USER_STATUS_LOADED,
  GET_USER_STATUS_FALSE,
  GET_REGISTER_ERROR_MESSAGE,
  LOGGEDOUT,
  RESET_PASSWORD_ACCESS,
  GET_AUTH_STATUS_LOADING,
  GET_AUTH_STATUS_LOADED,
  GET_AUTH_STATUS_FALSE,
  GET_LOGIN_ERROR_MESSAGE,
  GET_RESET_ERROR_MESSAGE,
} from "../actions/auth";

const initialState = {
  isLoadingUser: false,
  hasErrorUser: false,
  isLoadingAuth: false,
  hasErrorAuth: false,
  registerErrorMessage: "",
  loginErrorMessage: "",
  resetErrorMessage: "",
  loggedIn: false,
  resetPasswordAccess: false,
  user: {},
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_STATUS_LOADING:
      return { ...state, hasErrorUser: false, isLoadingUser: true };
    case GET_USER_STATUS_LOADED:
      return { ...state, isLoadingUser: false };
    case GET_USER_STATUS_FALSE:
      return { ...state, hasErrorUser: true, isLoadingUser: false };
    case GET_AUTH_STATUS_LOADING:
      return { ...state, hasErrorAuth: false, isLoadingAuth: true };
    case GET_AUTH_STATUS_LOADED:
      return { ...state, isLoadingAuth: false };
    case GET_AUTH_STATUS_FALSE:
      return { ...state, hasErrorAuth: true, isLoadingAuth: false };
    case GET_REGISTER_ERROR_MESSAGE:
      return { ...state, registerErrorMessage: action.payload };
    case GET_LOGIN_ERROR_MESSAGE:
      return { ...state, loginErrorMessage: action.payload };
    case GET_RESET_ERROR_MESSAGE:
      return { ...state, resetErrorMessage: action.payload };
    case LOGGEDIN:
      return { ...state, loggedIn: true };
    case LOGGEDOUT:
      return { ...state, loggedIn: false, user: {} };
    case RESET_PASSWORD_ACCESS:
      return { ...state, resetPasswordAccess: action.payload };
    case SET_USER_DATA:
      return { ...state, user: action.payload };

    default:
      return state;
  }
};
