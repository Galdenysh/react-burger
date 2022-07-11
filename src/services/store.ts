import { legacy_createStore as createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from "./constants/webSocket";
import {
  WS_CONNECTION_CLOSED_AUTH,
  WS_CONNECTION_ERROR_AUTH,
  WS_CONNECTION_START_AUTH,
  WS_CONNECTION_SUCCESS_AUTH,
  WS_GET_MESSAGE_AUTH,
  WS_SEND_MESSAGE_AUTH,
} from "./constants/webSocketAuth";
import { socketMiddleware } from "./middleware/socketMiddleware";
import { rootReducer } from "./reducers";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const wsUrl = "wss://norma.nomoreparties.space/orders/all";
const wsUrlAuth = "wss://norma.nomoreparties.space/orders";

export interface IWsActions {
  wsInit: string;
  wsSendMessage: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
}

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

const wsActionsAuth = {
  wsInit: WS_CONNECTION_START_AUTH,
  wsSendMessage: WS_SEND_MESSAGE_AUTH,
  onOpen: WS_CONNECTION_SUCCESS_AUTH,
  onClose: WS_CONNECTION_CLOSED_AUTH,
  onError: WS_CONNECTION_ERROR_AUTH,
  onMessage: WS_GET_MESSAGE_AUTH,
};

const enhancer = composeEnhancers(
  applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions, false), socketMiddleware(wsUrlAuth, wsActionsAuth, true))
);

export const store = createStore(rootReducer, enhancer);
