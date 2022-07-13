import { Reducer } from "redux";
import { IUser } from "../../utils/types";
import { AuthAction } from "../actions/auth";
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
  SET_AUTH_CHECK,
} from "../constants/auth";

interface IAuthState {
  isLoadingUser: boolean;
  hasErrorUser: boolean;
  isLoadingAuth: boolean;
  hasErrorAuth: boolean;
  registerErrorMessage: string;
  loginErrorMessage: string;
  resetErrorMessage: string;
  loggedIn: boolean;
  isAuthChecked: boolean;
  resetPasswordAccess: boolean;
  user: IUser | null;
}

const initialState = {
  isLoadingUser: false,
  hasErrorUser: false,
  isLoadingAuth: false,
  hasErrorAuth: false,
  registerErrorMessage: "",
  loginErrorMessage: "",
  resetErrorMessage: "",
  loggedIn: false,
  isAuthChecked: false,
  resetPasswordAccess: false,
  user: null,
};

export const authReducer: Reducer<IAuthState, AuthAction> = (state = initialState, action: AuthAction): IAuthState => {
  switch (action.type) {
    case GET_USER_STATUS_LOADING:
      return { ...state, hasErrorUser: false, isLoadingUser: true };
    case GET_USER_STATUS_LOADED:
      return { ...state, hasErrorUser: false, isLoadingUser: false };
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
      return { ...state, loggedIn: false, user: null };
    case SET_AUTH_CHECK:
      return { ...state, isAuthChecked: action.payload };
    case RESET_PASSWORD_ACCESS:
      return { ...state, resetPasswordAccess: action.payload };
    case SET_USER_DATA:
      return { ...state, user: action.payload };

    default:
      return state;
  }
};
