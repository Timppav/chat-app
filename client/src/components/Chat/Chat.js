import React, {useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import io from "socket.io-client";

import "./Chat.css";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";

let socket;

const Chat = () => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [users, setUsers] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const location = useLocation();
    const navigate = useNavigate();
    const ENDPOINT = "localhost:5000";

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT,{transports:['websocket','polling','flashsocket']});

        setName(name);
        setRoom(room);

        socket.emit("join", { name, room }, (error) => {
            if (error) {
                alert(error);
                navigate("/");
            }
        });

        return () => {
            socket.disconnect();
            socket.off();
        }
    }, [ENDPOINT, location.search, navigate]);

    useEffect(() => {
        socket.on("message", (message) => {
            setMessages(messages => [ ...messages, message ]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        })

        return () => {
            socket.off("message");
            socket.off("roomData");
        };
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit("sendMessage", message, () => setMessage(""));
        }
    };

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users} />
        </div>
    )
};

export default Chat;