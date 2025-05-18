import React, { useState} from "react";
import { useNavigate } from "react-router-dom";

import "./Join.css";

const MAX_LENGTH = 20;

const Join = () => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const navigate = useNavigate();

    const handleNameChange = (event) => {
        const value = event.target.value;
        if (value.length <= MAX_LENGTH) {
            setName(value);
        }
    };

    const handleRoomChange = (event) => {
        const value = event.target.value;
        if (value.length <= MAX_LENGTH) {
            setRoom(value);
        }
    };

    const handleJoin = () => {
        if (name && room) {
            navigate(`/chat?name=${name}&room=${room}`);
        }
    };

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join a chatroom</h1>
                <div>
                    <input
                    placeholder="Name"
                    className="joinInput"
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    maxLength={MAX_LENGTH}
                    />
                    <div className={`characterCount ${name.length >= MAX_LENGTH ? 'limit' : name.length >= MAX_LENGTH * 0.8 ? 'warning' : ''}`}>
                        {name.length}/{MAX_LENGTH}
                    </div>
                </div>
                <div>
                    <input
                        placeholder="Room"
                        className="joinInput mt-20"
                        type="text"
                        value={room}
                        onChange={handleRoomChange}
                        maxLength={MAX_LENGTH}
                    />
                    <div className={`characterCount ${room.length >= MAX_LENGTH ? 'limit' : room.length >= MAX_LENGTH * 0.8 ? 'warning' : ''}`}>
                        {room.length}/{MAX_LENGTH}
                    </div>
                </div>
            </div>
            <button
                className={`button mt-20 ${(!name || !room) ? "button-disabled" : ""}`}
                type="button"
                onClick={handleJoin}
                disabled={!name || !room}
            >Join</button>
        </div>
    )
};

export default Join;