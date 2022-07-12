import { WebSocketAuthAction } from "../actions/webSocketAuth";
import {
  WS_CONNECTION_CLOSED_AUTH,
  WS_CONNECTION_ERROR_AUTH,
  WS_CONNECTION_SUCCESS_AUTH,
  WS_GET_MESSAGE_AUTH,
} from "../constants/webSocketAuth";

interface IWebSocketAuthState {
  wsConnected: boolean;
  messages: any;
  error: boolean;
  errorMessage: string;
}

const initialState = {
  wsConnected: false,
  messages: [],
  error: false,
  errorMessage: "",
};

export const webSocketReducerAuth = (state = initialState, action: WebSocketAuthAction): IWebSocketAuthState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS_AUTH:
      return { ...state, error: false, wsConnected: true };
    case WS_CONNECTION_ERROR_AUTH:
      return { ...state, error: true, errorMessage: action.payload, wsConnected: false };
    case WS_CONNECTION_CLOSED_AUTH:
      return { ...state, error: false, wsConnected: false };
    case WS_GET_MESSAGE_AUTH:
      return { ...state, error: false, messages: [action.payload] };

    default:
      return state;
  }
};
