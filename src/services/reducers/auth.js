import { GET_USER_DATA, LOGGEDIN } from "../actions/auth";

const initialState = {
  loggedIn: false,
  email: "",
  userName: "",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGEDIN:
      return { ...state, loggedIn: action.payload };
    // case GET_USER_DATA:
    //   return {
    //     ...state,
    //     email: action.payload.email,
    //     userName: action.payload.name,
    //   };
    case GET_USER_DATA:
      return {
        ...state,
      };

    default:
      return state;
  }
};
