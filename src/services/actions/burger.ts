import { Dispatch } from "redux";
import { api } from "../../components/api/api";
import { IIngredient } from "../../utils/types";
import {
  ADD_BUN_INGREDIENT,
  ADD_FILLING_INGREDIENT,
  CLEAR_FILLING_INGREDIENT,
  DECREASE_FILLING_INGREDIENT,
  GET_INGREDIENTS,
  GET_INGREDIENTS_STATUS_FALSE,
  GET_INGREDIENTS_STATUS_LOADED,
  GET_INGREDIENTS_STATUS_LOADING,
  INCREASE_FILLING_INGREDIENT,
  REMOVE_FILLING_INGREDIENT,
  SET_FILLING_INGREDIENT,
} from "../constants/burger";

export interface IGetIngredients {
  readonly type: typeof GET_INGREDIENTS;
  readonly payload: IIngredient[];
}

export interface IAddBunIngredient {
  readonly type: typeof ADD_BUN_INGREDIENT;
  readonly payload: IIngredient;
}

export interface IAddFillingIngredient {
  readonly type: typeof ADD_FILLING_INGREDIENT;
  readonly payload: IIngredient;
}

export interface IRemoveFillingIngredient {
  readonly type: typeof REMOVE_FILLING_INGREDIENT;
  readonly id: string | undefined;
}

export interface IIncreaseFillingIngredient {
  readonly type: typeof INCREASE_FILLING_INGREDIENT;
  readonly id: string;
}

export interface IDecreaseFillingIngredient {
  readonly type: typeof DECREASE_FILLING_INGREDIENT;
  readonly id: string;
}

export interface ISetFillingIngredient {
  readonly type: typeof SET_FILLING_INGREDIENT;
  readonly payload: IIngredient[];
}

export interface IGetIngredientsStatusLoading {
  readonly type: typeof GET_INGREDIENTS_STATUS_LOADING;
}

export interface IGetIngredientsStatusLoaded {
  readonly type: typeof GET_INGREDIENTS_STATUS_LOADED;
}

export interface IGetIngredientsStatusFalse {
  readonly type: typeof GET_INGREDIENTS_STATUS_FALSE;
}

export interface IClearFillingIngredients {
  readonly type: typeof CLEAR_FILLING_INGREDIENT;
}

export type BurgerAction =
  | IGetIngredients
  | IAddBunIngredient
  | IAddFillingIngredient
  | IRemoveFillingIngredient
  | IIncreaseFillingIngredient
  | IDecreaseFillingIngredient
  | ISetFillingIngredient
  | IGetIngredientsStatusLoading
  | IGetIngredientsStatusLoaded
  | IGetIngredientsStatusFalse
  | IClearFillingIngredients;

export const fetchIngredients = () => {
  return (dispatch: Dispatch<BurgerAction>) => {
    dispatch(getIngredientsStatusLoading());

    api
      .getIngredients()
      .then((ingredients) => {
        if (ingredients.success) {
          dispatch(getIngredients(ingredients.data));
          dispatch(getIngredientsStatusLoaded());
        }
      })
      .catch((err) => {
        dispatch(getIngredientsStatusFalse());
        console.log(err.status);
      });
  };
};

export const getIngredients = (payload: IIngredient[]) => {
  return {
    type: GET_INGREDIENTS,
    payload,
  };
};

export const addBunIngredient = (payload: IIngredient) => {
  return {
    type: ADD_BUN_INGREDIENT,
    payload,
  };
};

export const addFillingIngredient = (payload: IIngredient) => {
  return {
    type: ADD_FILLING_INGREDIENT,
    payload,
  };
};

export const removeFillingIngredient = (id: string | undefined) => {
  return {
    type: REMOVE_FILLING_INGREDIENT,
    id,
  };
};

export const increaseFillingIngredient = (id: string) => {
  return {
    type: INCREASE_FILLING_INGREDIENT,
    id,
  };
};

export const decreaseFillingIngredient = (id: string) => {
  return {
    type: DECREASE_FILLING_INGREDIENT,
    id,
  };
};

export const setFillingIngredient = (payload: IIngredient[]) => {
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
