import { combineReducers } from "redux";
import { burgerReducer } from "./burger";
import { orderReducer } from "./order";
import { authReducer } from "./auth";
import { webSocketReducer } from "./webSocket";
import { webSocketReducerAuth } from "./webSocketAuth";

export const rootReducer = combineReducers({
  burger: burgerReducer,
  order: orderReducer,
  auth: authReducer,
  ws: webSocketReducer,
  wsAuth: webSocketReducerAuth,
});
