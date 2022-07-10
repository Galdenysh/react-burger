import { api } from "../../components/api/api";

export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const ADD_BUN_INGREDIENT = "ADD_BUN_INGREDIENT";
export const ADD_FILLING_INGREDIENT = "ADD_FILLING_INGREDIENT";
export const REMOVE_FILLING_INGREDIENT = "REMOVE_FILLING_INGREDIENT";
export const INCREASE_FILLING_INGREDIENT = "INCREASE_FILLING_INGREDIENT";
export const DECREASE_FILLING_INGREDIENT = "DECREASE_FILLING_INGREDIENT";
export const SET_FILLING_INGREDIENT = "SET_FILLING_INGREDIENT";
export const GET_INGREDIENTS_STATUS_LOADING = "GET_INGREDIENTS_STATUS_LOADING";
export const GET_INGREDIENTS_STATUS_LOADED = "GET_INGREDIENTS_STATUS_LOADED";
export const GET_INGREDIENTS_STATUS_FALSE = "GET_INGREDIENTS_STATUS_FALSE";
export const CLEAR_FILLING_INGREDIENT = "CLEAR_FILLING_INGREDIENT";

export const getIngredients = () => {
  return (dispatch) => {
    dispatch(getIngredientsStatusLoading());

    api
      .getIngredients()
      .then((ingredients) => {
        if (ingredients.success) {
          dispatch({ type: GET_INGREDIENTS, payload: ingredients.data });
          dispatch(getIngredientsStatusLoaded());
        }
      })
      .catch((err) => {
        dispatch(getIngredientsStatusFalse());
        console.log(err.status);
      });
  };
};

export const addBunIngredient = (payload) => {
  return {
    type: ADD_BUN_INGREDIENT,
    payload,
  };
};

export const addFillingIngredient = (payload) => {
  return {
    type: ADD_FILLING_INGREDIENT,
    payload,
  };
};

export const removeFillingIngredient = (id) => {
  return {
    type: REMOVE_FILLING_INGREDIENT,
    id,
  };
};

export const increaseFillingIngredient = (id) => {
  return {
    type: INCREASE_FILLING_INGREDIENT,
    id,
  };
};

export const decreaseFillingIngredient = (id) => {
  return {
    type: DECREASE_FILLING_INGREDIENT,
    id,
  };
};

export const setFillingIngredient = (payload) => {
  return {
    type: SET_FILLING_INGREDIENT,
    payload,
  };
};

export const getIngredientsStatusLoading = () => {
  return {
    type: GET_INGREDIENTS_STATUS_LOADING,
  };
};

export const getIngredientsStatusLoaded = () => {
  return {
    type: GET_INGREDIENTS_STATUS_LOADED,
  };
};

export const getIngredientsStatusFalse = () => {
  return {
    type: GET_INGREDIENTS_STATUS_FALSE,
  };
};

export const clearFillingIngredients = () => {
  return {
    type: CLEAR_FILLING_INGREDIENT,
  };
};
