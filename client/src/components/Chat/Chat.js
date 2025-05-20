import React, {useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import io from "socket.io-client";

import "./Chat.css";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import UsersList from "../UsersList/UsersList";

let socket;

const Chat = () => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const location = useLocation();
    const navigate = useNavigate();
    const ENDPOINT = "localhost:5000";

    useEffect(() => {
        const { name, room, avatar: parsedAvatar } = queryString.parse(location.search);
        const avatar = parsedAvatar || "avatar1";

        if (!name || !room) {
            navigate("/");
        }

        socket = io(ENDPOINT,{transports:['websocket','polling','flashsocket']});

        setName(name);
        setRoom(room);

        socket.emit("join", { name, room, picture: avatar || "avatar1" }, (error) => {
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
        });

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

    if (!name || !room) {
        return null;
    }

    return (
        <div className="outerContainer">
            <UsersList users={users} />
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
};

export default Chat;