import {
  GET_INGREDIENTS,
  GET_CONSTRUCTOR,
  GET_STATUS_LOADING,
  GET_STATUS_LOADED,
  GET_STATUS_FALSE,
  ADD_INFO_INGREDIENT,
  GET_ORDER,
  REMOVE_INFO_INGREDIENT,
  ADD_FILLING_INGREDIENT,
  ADD_BUN_INGREDIENT,
  INCREASE_FILLING_INGREDIENT,
  DECREASE_FILLING_INGREDIENT,
  REMOVE_FILLING_INGREDIENT,
} from "../actions/burger.js";
import { random } from "../../utils/random.js";

const initialState = {
  isLoading: false,
  hasError: false,
  ingredientsData: [],
  bunSelect: {},
  fillingSelect: [],
  ingredientSelect: {},
  orderData: 0,
};

export const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STATUS_LOADING:
      return { ...state, hasError: false, isLoading: true };
    case GET_STATUS_LOADED:
      return { ...state, isLoading: false };
    case GET_STATUS_FALSE:
      return { ...state, hasError: true, isLoading: false };
    case GET_INGREDIENTS:
      return { ...state, ingredientsData: action.payload.map((ingredient) => ({ ...ingredient, qty: 0 })) };
    case GET_CONSTRUCTOR:
      return {
        ...state,
        bunSelect: random(
          action.payload.map((ingredient) => ({ ...ingredient, qty: 0 })).filter((item) => item.type === "bun"),
          1
        )[0],
      };
    case ADD_BUN_INGREDIENT:
      return {
        ...state,
        ingredientsData: [...state.ingredientsData].map((ingredient) => {
          if (ingredient.type === "bun") {
            return ingredient._id === action.payload._id ? { ...ingredient, qty: 1 } : { ...ingredient, qty: 0 };
          } else {
            return { ...ingredient };
          }
        }),
        bunSelect: action.payload,
      };
    case ADD_FILLING_INGREDIENT:
      return {
        ...state,
        fillingSelect: [action.payload, ...state.fillingSelect].map((ingredient) => ({
          ...ingredient,
          constructorId: ingredient._id + ingredient.qty,
        })),
      };
    case REMOVE_FILLING_INGREDIENT:
      return { ...state, fillingSelect: [...state.fillingSelect].filter((ingredient) => ingredient._id + ingredient.qty !== action.id) };
    case INCREASE_FILLING_INGREDIENT: {
      return {
        ...state,
        ingredientsData: [...state.ingredientsData].map((ingredient) => (ingredient._id === action.id ? { ...ingredient, qty: ++ingredient.qty } : ingredient)),
      };
    }
    case DECREASE_FILLING_INGREDIENT: {
      return {
        ...state,
        ingredientsData: [...state.ingredientsData].map((ingredient) => (ingredient._id === action.id ? { ...ingredient, qty: --ingredient.qty } : ingredient)),
      };
    }
    case ADD_INFO_INGREDIENT:
      return { ...state, ingredientSelect: action.payload };
    case REMOVE_INFO_INGREDIENT:
      return { ...state, ingredientSelect: {} };
    case GET_ORDER:
      return { ...state, orderData: action.payload };

    default:
      return state;
  }
};
