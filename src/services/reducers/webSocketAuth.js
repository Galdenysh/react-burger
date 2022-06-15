import { WS_CONNECTION_CLOSED_AUTH, WS_CONNECTION_ERROR_AUTH, WS_CONNECTION_SUCCESS_AUTH, WS_GET_MESSAGE_AUTH } from "../actions/webSocketAuth";

const initialState = {
  wsConnected: false,
  messages: [],
  error: undefined,
};

export const webSocketReducerAuth = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS_AUTH:
      return { ...state, error: undefined, wsConnected: true };
    case WS_CONNECTION_ERROR_AUTH:
      return { ...state, error: action.payload, wsConnected: false };
    case WS_CONNECTION_CLOSED_AUTH:
      return { ...state, error: undefined, wsConnected: false };
    case WS_GET_MESSAGE_AUTH:
      return { ...state, error: undefined, messages: [action.payload] };

    default:
      return state;
  }
};
