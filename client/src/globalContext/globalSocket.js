import React, { useState, useEffect, useRef, createContext} from "react";

export const WebsocketContext = createContext();
//                                            ready, value, send

// Make sure to put WebsocketProvider higher up in
// the component tree than any consumers.
export const WebsocketProvider = ({ children }) => {
//   const [isReady, setIsReady] = useState(false);
//   const [val, setVal] = useState(null);

//   const ws = useRef(null);

  const ws = new WebSocket("wss://dutch-pay-ws.herokuapp.com/");

//   useEffect(() => {
//     const socket = new WebSocket("wss://echo.websocket.events/");

//     // socket.onopen = () => setIsReady(true);
//     // socket.onclose = () => setIsReady(false);
//     // socket.onmessage = (event) => setVal(event.data);

//     ws.current = socket;

//     return () => {
//       socket.close();
//     };
//   }, []);

//   const ret = {ws};

  return (
    <WebsocketContext.Provider value={ws}>
      {children}
    </WebsocketContext.Provider>
  );
};