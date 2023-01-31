import { Middleware } from "@reduxjs/toolkit";
import { TRootState } from "../..";
import { getCookie } from "../../util/functions";


export const socketMiddleware = (wsUrl: string, wsActions: any): Middleware => {
  return (store) => {
    let socket: null | WebSocket = null;

    return next => action => {
      const { dispatch } = store;
      const { type } = action;
      const { wsConnect, wsDisconnect, wsConnecting, wsOpen, wsClose, wsError, wsMessage } = wsActions;
      
      if (type === wsConnect) {
        socket = action.token ? new WebSocket(`${wsUrl}?token=${action.token}`) : new WebSocket(wsUrl);
        dispatch({type: wsConnecting});
      }
      if (type === wsDisconnect) {
        socket?.close(1000, 'closed');
        dispatch({type: wsClose})
      }
      if (socket) {
        socket.onopen = () => {
          dispatch({type: wsOpen});
        };

        socket.onerror = (event ) => {
          dispatch({type: wsError, error: event});
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: wsMessage, data: parsedData });
        };

        socket.onclose = () => {
          dispatch({type: wsClose});
        };
      }
      next(action);
    };
  };
};