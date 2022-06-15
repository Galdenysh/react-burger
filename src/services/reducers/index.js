import { combineReducers } from "redux";
import { burgerReducer } from "./burger.js";
import { orderReducer } from "./order.js";
import { authReducer } from "./auth.js";
import { webSocketReducer } from "./webSocket.js";
import { webSocketReducerAuth } from "./webSocketAuth.js";

export const rootReducer = combineReducers({ burgerReducer, orderReducer, authReducer, webSocketReducer, webSocketReducerAuth });
