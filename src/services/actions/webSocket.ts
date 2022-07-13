import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from "../constants/webSocket";

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}

export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  readonly payload: any;
}

export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: any;
}

export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
  readonly payload: any;
}

export interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: any;
}

export interface IWsSendMessage {
  readonly type: typeof WS_SEND_MESSAGE;
}

export type WebSocketAction =
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsGetMessage
  | IWsSendMessage;

export const wsConnectionStart = () => {
  return {
    type: WS_CONNECTION_START,
  };
};

export const wsConnectionSuccess = (payload?: any) => {
  return {
    type: WS_CONNECTION_SUCCESS,
    payload,
  };
};

export const wsConnectionError = (payload: any) => {
  return {
    type: WS_CONNECTION_ERROR,
    payload,
  };
};

export const wsConnectionClosed = (payload?: any) => {
  return {
    type: WS_CONNECTION_CLOSED,
    payload,
  };
};

export const wsGetMessage = (payload: any) => {
  return {
    type: WS_GET_MESSAGE,
    payload,
  };
};

export const wsSendMessage = () => {
  return {
    type: WS_SEND_MESSAGE,
  };
};
