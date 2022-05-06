import {
  GET_INGREDIENTS,
  GET_BUN_INGREDIENT,
  ADD_INFO_INGREDIENT,
  REMOVE_INFO_INGREDIENT,
  ADD_FILLING_INGREDIENT,
  ADD_BUN_INGREDIENT,
  INCREASE_FILLING_INGREDIENT,
  DECREASE_FILLING_INGREDIENT,
  REMOVE_FILLING_INGREDIENT,
  SET_FILLING_INGREDIENT,
  GET_INGREDIENTS_STATUS_LOADING,
  GET_INGREDIENTS_STATUS_LOADED,
  GET_INGREDIENTS_STATUS_FALSE,
} from "../actions/burger.js";

const initialState = {
  isLoading: false,
  hasError: false,
  ingredientsData: [],
  bunSelect: {},
  fillingSelect: [],
  ingredientSelect: {},
};

export const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_STATUS_LOADING:
      return { ...state, hasError: false, isLoading: true };
    case GET_INGREDIENTS_STATUS_LOADED:
      return { ...state, isLoading: false };
    case GET_INGREDIENTS_STATUS_FALSE:
      return { ...state, hasError: true, isLoading: false };
    case GET_INGREDIENTS:
      return { ...state, ingredientsData: action.payload.map((ingredient) => ({ ...ingredient, qty: 0 })) };
    case GET_BUN_INGREDIENT:
      return { ...state, bunSelect: { ...action.payload, qty: 0 } };
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
        fillingSelect: [action.payload, ...state.fillingSelect],
      };
    case REMOVE_FILLING_INGREDIENT:
      return { ...state, fillingSelect: [...state.fillingSelect].filter((ingredient) => ingredient.constructorId !== action.id) };
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
    case SET_FILLING_INGREDIENT:
      return { ...state, fillingSelect: action.payload };
    case ADD_INFO_INGREDIENT:
      return { ...state, ingredientSelect: action.payload };
    case REMOVE_INFO_INGREDIENT:
      return { ...state, ingredientSelect: {} };

    default:
      return state;
  }
};
