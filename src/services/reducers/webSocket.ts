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
  error: boolean;
  errorMessage: string;
}

const initialState = {
  wsConnected: false,
  messages: [],
  error: false,
  errorMessage: "",
};

export const webSocketReducer = (state = initialState, action: WebSocketAction): IWebSocketState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return { ...state, error: false, wsConnected: true };
    case WS_CONNECTION_ERROR:
      return { ...state, error: true, errorMessage: action.payload, wsConnected: false };
    case WS_CONNECTION_CLOSED:
      return { ...state, error: false, wsConnected: false };
    case WS_GET_MESSAGE:
      return { ...state, error: false, messages: [action.payload] };

    default:
      return state;
  }
};
