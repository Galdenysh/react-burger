import { api } from "../../components/api/api";
import { setRefreshToken } from "./auth";
import { clearFillingIngredients } from "./burger";

export const GET_ORDER = "GET_ORDER";
export const GET_ORDER_STATUS_LOADING = "GET_ORDER_STATUS_LOADING";
export const GET_ORDER_STATUS_LOADED = "GET_ORDER_STATUS_LOADED";
export const GET_ORDER_STATUS_FALSE = "GET_ORDER_STATUS_FALSE";

export const getOrder = (data) => {
  return (dispatch) => {
    dispatch(getOrderStatusLoading());

    api
      .sendOrder({
        ingredients: [...data.fillingSelect, data.bunSelect].map((item) => item._id),
      })
      .then((res) => {
        if (res.success) {
          dispatch({ type: GET_ORDER, payload: res.order.number });
          dispatch(getOrderStatusLoaded());
          dispatch(clearFillingIngredients());
        } else {
          dispatch(setRefreshToken());
        }
      })
      .catch((err) => {
        dispatch(getOrderStatusFalse());
        console.log(err.status);
      });
  };
};

export const getOrderStatusLoading = () => {
  return {
    type: GET_ORDER_STATUS_LOADING,
  };
};

export const getOrderStatusLoaded = () => {
  return {
    type: GET_ORDER_STATUS_LOADED,
  };
};

export const getOrderStatusFalse = () => {
  return {
    type: GET_ORDER_STATUS_FALSE,
  };
};
