import React from "react";

let instance = null;

class WebsocketController extends React.Component{

    serverMessagesList = [];

    constructor(props) {
        super(props)
        if(!instance){
            console.log("creating new instance of websocket")
            instance = this;
        }

        this.state = {
            serverState: 'Loading...',
            messageText: 'hello',
            serverMessages: this.serverMessagesList
        }
        

        this.ws = new WebSocket('wss://dutch-pay-ws.herokuapp.com/');

        // this.ws.onopen = () => {
        //     console.log("occurred")
            // this.setState({serverState: 'Connected to the server'})
            // console.log(serverState)
        // };
        // this.ws.onclose = (e) => {
        //     console.log(e)
        //     this.setState({serverState: 'Disconnected. Check internet or server.'})
        //   };
        // this.ws.onerror = (e) => {
        //     console.log('got here')
        //     this.setState({serverState: e.message});
        // };
        // this.ws.onmessage = ({data}) => {
        //     console.log({data})
        //     serverMessagesList.push({data});
        //     console.log(serverMessagesList)
        //     this.setState({serverMessages: serverMessagesList})
        //     console.log(serverMessages)
        // };
        return instance;
    }

        // ws.onopen = () => {
        //     this.setState({serverState: 'Connected to the server'})
        //     // console.log(serverState)
        //   };
        // this.ws.onclose = (e) => {
        //     console.log(e)
        //     this.setState({serverState: 'Disconnected. Check internet or server.'})
        //   };
        // this.ws.onerror = (e) => {
        //     console.log('got here')
        //     this.setState({serverState: e.message});
        // };
        // this.ws.onmessage = ({data}) => {
        //     console.log({data})
        //     serverMessagesList.push({data});
        //     console.log(serverMessagesList)
        //     this.setState({serverMessages: serverMessagesList})
        //     console.log(serverMessages)
        // };
}

export default WebsocketController