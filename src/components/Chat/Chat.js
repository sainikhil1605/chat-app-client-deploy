import { useEffect, useState } from 'react'
import io from 'socket.io-client';
import queryString from 'query-string';
import InfoBar from '../Info/Info';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';
import Messages from '../Messages/Messages';
export const useStyles = makeStyles({


    chatOuterContainer: {
        backgroundColor: "black",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    },
    chatInnerContainer: {
        border: "2px solid grey",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        width: "25%",
        justifyContent: "space-between",
        height: "75%",
        overflow: "auto",
        // padding: "0px 90px 90px 90px",
        backgroundColor: "white",


    },
    chat: {
        display: "flex",
        flexDirection: "row",
        alignItems: 'flex-end',
        height: 'initial',
    },
    chatTextInput: {
        width: "80%",
        display: "inline",
        padding: "16px",
        borderRadius: "5px",
    },
    sendButton: {
        backgroundColor: "#1877f2",
        border: "none",
        padding: "16px",
        width: "20%",
        color: "white",
        borderRadius: "5px",
        fontWeight: "bold",
        cursor: "pointer"
    }
})
let socket
export const Chat = ({ location }) => {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'http://localhost:4000';
    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        socket = io(ENDPOINT);
        setName(name);
        setRoom(room);

        socket.emit('join', { name, room })
        return () => {
            socket.emit("disconnect");
            socket.off();
        }
    }, [ENDPOINT, location.search]);
    useEffect(() => {
        socket.on('message', (message) => {
            console.log(message);
            setMessages([...messages, message]);
        })
    }, [messages])
    const sendMessage = (e) => {
        e.preventDefault();
        console.log("hi", message);
        if (message) {

            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    return (
        <div className={classes.chatOuterContainer}>
            <div className={classes.chatInnerContainer}>
                <InfoBar room={room} name={name} />
                <Messages messages={messages} name={name} />


                <div className={classes.chat}>

                    <input className={classes.chatTextInput} value={message} placeholder="Type a Message" onChange={(e) => setMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' ? sendMessage(e) : null} />
                    <button className={classes.sendButton} onClick={(e) => sendMessage(e)}>Send</button>

                </div>
            </div>
        </div>
    )
}