import { GET_ORDER, GET_ORDER_STATUS_FALSE, GET_ORDER_STATUS_LOADED, GET_ORDER_STATUS_LOADING } from "../actions/order.js";

const initialState = {
  isLoading: false,
  hasError: false,
  orderData: 0,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_STATUS_LOADING:
      return { ...state, hasError: false, isLoading: true };
    case GET_ORDER_STATUS_LOADED:
      return { ...state, isLoading: false };
    case GET_ORDER_STATUS_FALSE:
      return { ...state, hasError: true, isLoading: false };
    case GET_ORDER:
      return { ...state, orderData: action.payload };

    default:
      return state;
  }
};
