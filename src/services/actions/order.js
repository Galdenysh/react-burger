import { api } from "../../components/api/api.js";
import { setRefreshToken } from "./auth.js";

export const GET_ORDER = "GET_ORDER";
export const GET_ORDER_STATUS_LOADING = "GET_ORDER_STATUS_LOADING";
export const GET_ORDER_STATUS_LOADED = "GET_ORDER_STATUS_LOADED";
export const GET_ORDER_STATUS_FALSE = "GET_ORDER_STATUS_FALSE";

export const getOrder = (data) => {
  return (dispatch) => {
    dispatch({ type: GET_ORDER_STATUS_LOADING });

    api
      .sendOrder({
        ingredients: [...data.fillingSelect, data.bunSelect].map((item) => item._id),
      })
      .then((res) => {
        if (res.success) {
          dispatch({ type: GET_ORDER, payload: res.order.number });
          dispatch({ type: GET_ORDER_STATUS_LOADED });
        } else {
          dispatch(setRefreshToken());
        }
      })
      .catch((err) => {
        dispatch({ type: GET_ORDER_STATUS_FALSE });
        console.log(err.status);
      });
  };
};
