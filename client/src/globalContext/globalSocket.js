// import React, { useState, useEffect, useRef, createContext} from "react";
// import WebsocketController from "../websocket/websocket";

// let controller = new WebsocketController();
// var ws = controller.ws;

// const SocketContext = createContext(ws)

// const SocketProvider = ( { children } ) => {


//     console.log("CALLING GLOBAL CONTEXT")
//     let controller = new WebsocketController();
//     var ws = controller.ws;

//     // function initAppSettings() {
//     //     fetch(`${domain}/app/settings`, {
//     //         method: 'GET'
//     //     })
//     //     .then(res => {
//     //         if (res.ok) {
//     //             return res.json()
//     //         } else {
//     //             throw res.json()
//     //         }
//     //     })
//     //     .then(json => {
//     //         console.log(json)
//     //         setAppSettings(json)
//     //     })
//     //     .catch(error => {
//     //         console.log(error)
//     //     })
//     // }

//     // useEffect(() => {
//     //     initAppSettings()
//     // }, [])

//     const globalContext = {
//         ws
//     }

//     return <Context.Provider value={globalContext}>{children}</Context.Provider>

// };

// export { SocketContext, SocketProvider };