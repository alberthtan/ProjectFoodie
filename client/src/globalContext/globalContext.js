import React, { useState, useEffect, useRef, createContext} from "react";
import * as SecureStore from 'expo-secure-store'

console.log("CALLING GLOBAL CONTEXT")
// let controller = new WebsocketController();
// var ws = controller.ws;
var ws = new WebSocket('wss://dutch-pay-ws.herokuapp.com/');

ws.onopen = () => {
    console.log('opening ws')
};

ws.onclose = (e) => {
    console.log('Disconnected. Check internet or server.')
    console.log(e.message)
};

ws.onerror = (e) => {
    console.log('error')
    console.log(e.message);
};

const Context = createContext()

const Provider = ( { children } ) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userObj, setUserObj] = useState(false)
    const [cart, setCart] = useState([])
    const setToken = async (refresh, access) => {
        await SecureStore.setItemAsync('refresh', refresh)
        await SecureStore.setItemAsync('access', access)
    }

    const getToken = async (key) => {
        let result = await SecureStore.getItemAsync(key);
        if (result) {
            return result
        }
        return ""
    }

    const deleteToken = async (key) => {
        try {
            await SecureStore.deleteItemAsync(key);
        } catch (error) {
            alert(`Unable to delete data key = ${key} from secure storage.`);
        }
    }

    // console.log("CALLING GLOBAL CONTEXT")
    // let controller = new WebsocketController();
    // var ws = controller.ws;

    // function initAppSettings() {
    //     fetch(`${domain}/app/settings`, {
    //         method: 'GET'
    //     })
    //     .then(res => {
    //         if (res.ok) {
    //             return res.json()
    //         } else {
    //             throw res.json()
    //         }
    //     })
    //     .then(json => {
    //         console.log(json)
    //         setAppSettings(json)
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
    // }

    // useEffect(() => {
    //     initAppSettings()
    // }, [])

    const globalContext = {
        // domain,
        isLoggedIn,
        setIsLoggedIn,
        // appSettings,
        // setAppSettings,
        userObj,
        cart,
        setCart,
        setUserObj,
        setToken,
        getToken,
        deleteToken,
        ws
    }

    return <Context.Provider value={globalContext}>{children}</Context.Provider>

};

export { Context, Provider };