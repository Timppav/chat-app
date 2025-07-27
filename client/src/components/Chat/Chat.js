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
    const [isLoading, setIsLoading] = useState(true);
    const [connectionError, setConnectionError] = useState("");

    const location = useLocation();
    const navigate = useNavigate();
    const { roomName } = useParams();
    const ENDPOINT = process.env.REACT_APP_CHAT_APP_URL || "localhost:5000";

    useEffect(() => {
        const userData = location.state;

        if (!userData || !userData.name || !roomName) {
            navigate("/");
            return;
        }

        const { name: userName, avatar, color } = userData;

        socket = io(ENDPOINT,{
            transports:['websocket','polling','flashsocket'],
            timeout: 20000
        });

        setName(userName);
        setRoom(roomName);

        socket.on("connect", () => {
            console.log("Connected to server");
            setConnectionError("");
        });

        socket.on("connect_error", (error) => {
            console.error("Connection error:", error);
            setConnectionError("Failed to connect to server. Retrying...");
        });

        socket.on("disconnect", (reason) => {
            console.log("Disconnected:", reason);
            if (reason === "io server disconnect") {
                socket.connect();
            }
        });

        socket.emit("join", { name: userName, room: roomName, picture: avatar || "avatar1", color: color }, (error) => {
            setIsLoading(false);
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

    if (isLoading) {
        return (
            <div className="outerContainer">
                <div className="innerContainer">
                    <UsersList users={users} />
                    <div className="chatContainer">
                        <InfoBar room={room} />
                        <div className="loadingContainer">
                            <div className="loadingSpinner"></div>
                            <h2>Connecting to chat...</h2>
                            {connectionError && (
                                <p className="connectionError">{connectionError}</p>
                            )}
                        </div>
                        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                    </div>
                </div>
            </div>
        )
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