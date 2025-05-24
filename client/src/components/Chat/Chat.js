import React, {useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
    const { roomName } = useParams();
    const ENDPOINT = process.env.REACT_APP_CHAT_APP_URL || "localhost:5000";

    console.log(users);

    useEffect(() => {
        const userData = location.state;

        if (!userData || !userData.name || !roomName) {
            navigate("/");
            return;
        }

        const { name: userName, avatar } = userData;

        socket = io(ENDPOINT,{transports:['websocket','polling','flashsocket']});

        setName(userName);
        setRoom(roomName);

        socket.emit("join", { name: userName, room: roomName, picture: avatar || "avatar1" }, (error) => {
            if (error) {
                alert(error);
                navigate("/");
            }
        });

        return () => {
            socket.disconnect();
            socket.off();
        }
    }, [ENDPOINT, location.state, roomName, navigate]);

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
            <div className="innerContainer">
                <UsersList users={users} />
                <div className="chatContainer">
                    <InfoBar room={room} />
                    <Messages messages={messages} name={name} />
                    <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                </div>
            </div>
        </div>
    )
};

export default Chat;