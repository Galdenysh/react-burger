import { api } from "../../components/api/api";
import { setRefreshToken } from "./auth";
import { BurgerAction, clearFillingIngredients } from "./burger";
import { Dispatch } from "redux";
import {
  GET_ORDER,
  GET_ORDER_STATUS_FALSE,
  GET_ORDER_STATUS_LOADED,
  GET_ORDER_STATUS_LOADING,
} from "../constants/order";

export interface IGetOrder {
  readonly type: typeof GET_ORDER;
  readonly payload: number;
}

export interface IGetOrderStatusFalse {
  readonly type: typeof GET_ORDER_STATUS_FALSE;
}

export interface IGetOrderStatusLoaded {
  readonly type: typeof GET_ORDER_STATUS_LOADED;
}

export interface IGetOrderStatusLoading {
  readonly type: typeof GET_ORDER_STATUS_LOADING;
}

export type OrderAction = IGetOrder | IGetOrderStatusFalse | IGetOrderStatusLoaded | IGetOrderStatusLoading;

export const fetchOrder = (data: any) => {
  return (dispatch: Dispatch<OrderAction | BurgerAction>) => {
    dispatch(getOrderStatusLoading());

    api
      .sendOrder({
        ingredients: [...data.fillingSelect, data.bunSelect].map((item) => item._id),
      })
      .then((res) => {
        if (res.success) {
          dispatch(getOrder(res.order.number));
          dispatch(getOrderStatusLoaded());
          dispatch(clearFillingIngredients());
        } else {
          setRefreshToken();
        }
      })
      .catch((err) => {
        dispatch(getOrderStatusFalse());
        console.log(err.status);
      });
  };
};

export const getOrder = (payload: number) => {
  return {
    type: GET_ORDER,
    payload,
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