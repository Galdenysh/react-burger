import { api } from "../../components/api/api";

export const LOGGEDIN = "LOGGEDIN";
export const SET_USER_DATA = "SET_USER_DATA";
export const GET_USER_DATA = "GET_USER_DATA";

export const getUserData = () => {
  return (dispatch) => {
    dispatch({ type: GET_USER_DATA });

    api
      .getUserData()
      .then((data) => {
        dispatch({ type: GET_USER_DATA, payload: data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
