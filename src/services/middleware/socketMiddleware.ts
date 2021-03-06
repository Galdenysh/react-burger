import { AnyAction, Middleware, MiddlewareAPI } from "redux";
import { getCookie } from "../../utils/cookie";
import { IWsActions } from "../store";
import { AppDispatch, RootState } from "../types";

export const socketMiddleware = (wsUrl: string, wsActions: IWsActions, auth: boolean): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next: (action: AnyAction) => void) => (action: AnyAction) => {
      const { dispatch } = store;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
      const { type, payload } = action;
      const accessToken = getCookie("accessToken");

      if (type === wsInit) {
        socket = auth && accessToken ? new WebSocket(`${wsUrl}?token=${accessToken}`) : new WebSocket(wsUrl);
      }

      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          dispatch({ type: onMessage, payload: JSON.parse(data) });
        };

        // функция, которая вызывается при закрытии соединения
        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const message = payload;
          // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};
