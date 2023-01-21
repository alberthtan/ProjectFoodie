import React, { useState, useEffect, useRef, createContext} from "react";
import * as SecureStore from 'expo-secure-store'

const Context = createContext()

const Provider = ( { children } ) => {

    // const [domain, setDomain] = useState("https://dutch-pay-test.herokuapp.com")
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    // const [token, setToken] = useState()
    const [userObj, setUserObj] = useState()
    // const [appSettings, setAppSettings] = useState({})
    const setToken = async (refresh, access) => {
        await SecureStore.setItemAsync('refresh', refresh)
        await SecureStore.setItemAsync('access', access)
    }

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
        setUserObj,
        setToken 
    }

    return <Context.Provider value={globalContext}>{children}</Context.Provider>

};

export { Context, Provider };