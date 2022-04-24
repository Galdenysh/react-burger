import {
  GET_INGREDIENTS,
  GET_CONSTRUCTOR,
  GET_STATUS_LOADING,
  GET_STATUS_LOADED,
  GET_STATUS_FALSE,
  ADD_INFO_INGREDIENT,
  GET_ORDER,
  REMOVE_INFO_INGREDIENT,
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
      return { ...state, ingredientsData: action.payload };
    case GET_CONSTRUCTOR:
      return {
        ...state,
        bunSelect: random(
          action.payload.filter((item) => item.type === "bun"),
          1
        )[0],
        fillingSelect: random(
          action.payload.filter((item) => item.type !== "bun"),
          5
        ),
      };
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
