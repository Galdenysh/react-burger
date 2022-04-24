import { api } from "../../components/api/api.js";

export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const GET_CONSTRUCTOR = "GET_CONSTRUCTOR";
export const ADD_INFO_INGREDIENT = "ADD_INFO_INGREDIENT";
export const REMOVE_INFO_INGREDIENT = "REMOVE_INFO_INGREDIENT";
export const GET_ORDER = "GET_ORDER";
export const GET_STATUS_LOADING = "GET_STATUS_LOADING";
export const GET_STATUS_LOADED = "GET_STATUS_LOADED";
export const GET_STATUS_FALSE = "GET_STATUS_FALSE";

export const getIngredients = () => {
  return (dispatch) => {
    dispatch({ type: GET_STATUS_LOADING });

    api
      .getIngredients()
      .then((ingredients) => {
        dispatch({ type: GET_INGREDIENTS, payload: ingredients.data });
        dispatch({ type: GET_CONSTRUCTOR, payload: ingredients.data });
        dispatch({ type: GET_STATUS_LOADED });
      })
      .catch((err) => {
        dispatch({ type: GET_STATUS_FALSE });
        console.log(err);
      });
  };
};

export const getOrder = (data) => {
  return (dispatch) => {
    dispatch({ type: GET_STATUS_LOADING });

    api
      .sendOrder([...data.fillingSelect, data.bunSelect].map((item) => item._id))
      .then((res) => {
        dispatch({ type: GET_ORDER, payload: res.order.number });
        dispatch({ type: GET_STATUS_LOADED });
      })
      .catch((err) => {
        dispatch({ type: GET_STATUS_FALSE });
        console.log(err);
      });
  };
};
