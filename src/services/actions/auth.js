import { api } from "../../components/api/api";

export const LOGGEDIN = "LOGGEDIN";
export const SET_USER_DATA = "SET_USER_DATA";
export const GET_USER_DATA = "GET_USER_DATA";
export const GET_USER_STATUS_LOADING = "GET_USER_STATUS_LOADING";
export const GET_USER_STATUS_LOADED = "GET_USER_STATUS_LOADED";
export const GET_USER_STATUS_FALSE = "GET_USER_STATUS_FALSE";

export const getUserData = () => {
  return (dispatch) => {
    dispatch({ type: GET_USER_STATUS_LOADING });

    api
      .getUserData()
      .then((data) => {
        dispatch({ type: GET_USER_DATA, payload: data.user });
        dispatch({ type: GET_USER_STATUS_LOADED });
      })
      .catch((err) => {
        dispatch({ type: GET_USER_STATUS_FALSE });
        console.log(err);
      });
  };
};
