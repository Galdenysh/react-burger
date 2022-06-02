import { LOGGEDIN, SET_USER_DATA, GET_USER_DATA } from "../actions/auth";

const initialState = {
  loggedIn: false,
  user: {
    email: "",
    userName: "",
  },
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
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
