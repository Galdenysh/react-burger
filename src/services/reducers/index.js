import { combineReducers } from "redux";
import { burgerReducer } from "./burger.js";
import { orderReducer } from "./order.js";

export const rootReducer = combineReducers({ burgerReducer, orderReducer });
