import {
  WS_CONNECTION_CLOSED_AUTH,
  WS_CONNECTION_ERROR_AUTH,
  WS_CONNECTION_START_AUTH,
  WS_CONNECTION_SUCCESS_AUTH,
  WS_GET_MESSAGE_AUTH,
  WS_SEND_MESSAGE_AUTH,
} from "../constants/webSocketAuth";

export interface IWsConnectionStartAuth {
  readonly type: typeof WS_CONNECTION_START_AUTH;
}

export interface IWsConnectionSuccessAuth {
  readonly type: typeof WS_CONNECTION_SUCCESS_AUTH;
  readonly payload: any;
}

export interface IWsConnectionErrorAuth {
  readonly type: typeof WS_CONNECTION_ERROR_AUTH;
  readonly payload: any;
}

export interface IWsConnectionClosedAuth {
  readonly type: typeof WS_CONNECTION_CLOSED_AUTH;
  readonly payload: any;
}

export interface IWsGetMessageAuth {
  readonly type: typeof WS_GET_MESSAGE_AUTH;
  readonly payload: any;
}

export interface IWsSendMessageAuth {
  readonly type: typeof WS_SEND_MESSAGE_AUTH;
}

export type WebSocketAuthAction =
  | IWsConnectionStartAuth
  | IWsConnectionSuccessAuth
  | IWsConnectionErrorAuth
  | IWsConnectionClosedAuth
  | IWsGetMessageAuth
  | IWsSendMessageAuth;

export const wsConnectionStartAuth = () => {
  return {
    type: WS_CONNECTION_START_AUTH,
  };
};

export const wsConnectionSuccessAuth = (payload?: any) => {
  return {
    type: WS_CONNECTION_SUCCESS_AUTH,
    payload,
  };
};

export const wsConnectionErrorAuth = (payload: any) => {
  return {
    type: WS_CONNECTION_ERROR_AUTH,
    payload,
  };
};

export const wsConnectionClosedAuth = (payload?: any) => {
  return {
    type: WS_CONNECTION_CLOSED_AUTH,
    payload,
  };
};

export const wsGetMessageAuth = (payload: any) => {
  return {
    type: WS_GET_MESSAGE_AUTH,
    payload,
  };
};

export const wsSendMessageAuth = () => {
  return {
    type: WS_SEND_MESSAGE_AUTH,
  };
};
