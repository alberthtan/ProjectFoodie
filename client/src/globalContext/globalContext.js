import React, { useState, useEffect, useRef, createContext} from "react";
import * as SecureStore from 'expo-secure-store'

const Context = createContext()

const Provider = ( { children } ) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userObj, setUserObj] = useState(false)
    const [cart, setCart] = useState([])
    const setToken = async (refresh, access) => {
        await SecureStore.setItemAsync('refresh', refresh)
        await SecureStore.setItemAsync('access', access)
    }
    const [ws, setWs] = useState(null)

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


    const globalContext = {
        isLoggedIn,
        setIsLoggedIn,
        userObj,
        cart,
        setCart,
        setUserObj,
        setToken,
        getToken,
        deleteToken,
        ws,
        setWs,
    }

    return <Context.Provider value={globalContext}>{children}</Context.Provider>

};

export { Context, Provider };