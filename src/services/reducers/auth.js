import { LOGGEDIN, SET_USER_DATA, GET_USER_DATA, GET_USER_STATUS_LOADING, GET_USER_STATUS_LOADED, GET_USER_STATUS_FALSE } from "../actions/auth";

const initialState = {
  isLoading: false,
  hasError: false,
  loggedIn: false,
  user: {
    email: "",
    userName: "",
  },
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_STATUS_LOADING:
      return { ...state, hasError: false, isLoading: true };
    case GET_USER_STATUS_LOADED:
      return { ...state, isLoading: false };
    case GET_USER_STATUS_FALSE:
      return { ...state, hasError: true, isLoading: false };
    case LOGGEDIN:
      return { ...state, loggedIn: action.payload };
    case SET_USER_DATA:
      return { ...state, user: action.payload };
    case GET_USER_DATA:
      return { ...state, user: action.payload };

    default:
      return state;
  }
};
