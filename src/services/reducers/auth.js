import {
  LOGGEDIN,
  SET_USER_DATA,
  GET_USER_STATUS_LOADING,
  GET_USER_STATUS_LOADED,
  GET_USER_STATUS_FALSE,
  GET_ERROR_MESSAGE,
  LOGGEDOUT,
  RESET_PASSWORD_ACCESS,
} from "../actions/auth";

const initialState = {
  isLoading: false,
  hasError: false,
  errorMessage: "",
  loggedIn: false,
  resetPasswordAccess: false,
  user: {},
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_STATUS_LOADING:
      return { ...state, hasError: false, isLoading: true };
    case GET_USER_STATUS_LOADED:
      return { ...state, isLoading: false };
    case GET_USER_STATUS_FALSE:
      return { ...state, hasError: true, isLoading: false };
    case GET_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload };
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
