import { OrderAction } from "../actions/order";
import {
  GET_ORDER,
  GET_ORDER_STATUS_FALSE,
  GET_ORDER_STATUS_LOADED,
  GET_ORDER_STATUS_LOADING,
} from "../constants/order";

interface IOrderState {
  isLoading: boolean;
  hasError: boolean;
  orderData: number;
}

const initialState: IOrderState = {
  isLoading: false,
  hasError: false,
  orderData: 0,
};

export const orderReducer = (state = initialState, action: OrderAction): IOrderState => {
  switch (action.type) {
    case GET_ORDER_STATUS_LOADING:
      return { ...state, hasError: false, isLoading: true };
    case GET_ORDER_STATUS_LOADED:
      return { ...state, hasError: false, isLoading: false };
    case GET_ORDER_STATUS_FALSE:
      return { ...state, hasError: true, isLoading: false };
    case GET_ORDER:
      return { ...state, orderData: action.payload };

    default:
      return state;
  }
};
