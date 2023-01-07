export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type } = action;
      const { wsConnect, wsDisconnect, wsConnecting, wsOpen, wsClose, wsError, wsMessage } = wsActions;
      
      if (type === wsConnect) {
        socket = new WebSocket(wsUrl);
        dispatch({type: wsConnecting});
      }
      if (type === wsDisconnect) {
        socket.close(1000, 'closed');
        dispatch({type: wsClose})
      }
      if (socket) {
        socket.onopen = () => {
          dispatch({type: wsOpen});
        };

        socket.onerror = event => {
          dispatch({type: wsError, error: event.code});
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