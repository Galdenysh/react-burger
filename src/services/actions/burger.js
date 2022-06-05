import { api } from "../../components/api/api.js";

export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const GET_BUN_INGREDIENT = "GET_BUN_INGREDIENT";
export const ADD_BUN_INGREDIENT = "ADD_BUN_INGREDIENT";
export const ADD_FILLING_INGREDIENT = "ADD_FILLING_INGREDIENT";
export const REMOVE_FILLING_INGREDIENT = "REMOVE_FILLING_INGREDIENT";
export const INCREASE_FILLING_INGREDIENT = "INCREASE_FILLING_INGREDIENT";
export const DECREASE_FILLING_INGREDIENT = "DECREASE_FILLING_INGREDIENT";
export const SET_FILLING_INGREDIENT = "SET_FILLING_INGREDIENT";
export const GET_INGREDIENTS_STATUS_LOADING = "GET_INGREDIENTS_STATUS_LOADING";
export const GET_INGREDIENTS_STATUS_LOADED = "GET_INGREDIENTS_STATUS_LOADED";
export const GET_INGREDIENTS_STATUS_FALSE = "GET_INGREDIENTS_STATUS_FALSE";

export const getIngredients = () => {
  return (dispatch) => {
    dispatch({ type: GET_INGREDIENTS_STATUS_LOADING });

    api
      .getIngredients()
      .then((ingredients) => {
        if (ingredients.success) {
          dispatch({ type: GET_INGREDIENTS, payload: ingredients.data });
          dispatch({ type: GET_BUN_INGREDIENT, payload: ingredients.data.filter((item) => item.type === "bun")[0] });
          dispatch({ type: GET_INGREDIENTS_STATUS_LOADED });
        }
      })
      .catch((err) => {
        dispatch({ type: GET_INGREDIENTS_STATUS_FALSE });
        console.log(err.status);
      });
  };
};
