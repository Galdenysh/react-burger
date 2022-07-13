import { Reducer } from "redux";
import { WebSocketAction } from "../actions/webSocket";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "../constants/webSocket";

interface IWebSocketState {
  wsConnected: boolean;
  messages: any;
  error: string | undefined;
}

const initialState = {
  wsConnected: false,
  messages: [],
  error: undefined,
};

export const webSocketReducer: Reducer<IWebSocketState, WebSocketAction> = (
  state = initialState,
  action: WebSocketAction
): IWebSocketState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return { ...state, error: undefined, wsConnected: true };
    case WS_CONNECTION_ERROR:
      return { ...state, error: action.payload, wsConnected: false };
    case WS_CONNECTION_CLOSED:
      return { ...state, error: undefined, wsConnected: false };
    case WS_GET_MESSAGE:
      return { ...state, error: undefined, messages: [action.payload] };

    default:
      return state;
  }
};
