import React, { useState} from "react";
import { useNavigate } from "react-router-dom";

import ProfilePictureSelector from "../ProfilePictureSelector/ProfilePictureSelector";
import "./Join.css";

const MAX_LENGTH = 20;

const Join = () => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [profilePicture, setProfilePicture] = useState("avatar1");
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

    const handlePictureSelect = (picturePath) => {
        setProfilePicture(picturePath);
    };

    const handleJoin = () => {
        if (name && room) {
            navigate(`/chat/${room}`, {
                state: {
                    name: name,
                    avatar: profilePicture
                }
            });
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleJoin();
        }
    };

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <div className="headingContainer">
                    <h1 className="heading">Chatrooms App</h1>
                </div>
                <div className="joinContainer">
                    <div className="joinInputContainer">
                        <div className="joinInputWrapper">
                            <label className="joinLabel">Enter your username:</label>
                            <input
                                placeholder="Name"
                                className="joinInput"
                                type="text"
                                value={name}
                                onChange={handleNameChange}
                                onKeyDown={handleKeyDown}
                                maxLength={MAX_LENGTH}
                            />
                            <div className={`characterCount ${name.length >= MAX_LENGTH ? 'limit' : name.length >= MAX_LENGTH * 0.8 ? 'warning' : ''}`}>
                                {name.length}/{MAX_LENGTH}
                            </div>
                        </div>
                        <div className="joinInputWrapper">
                            <label className="joinLabel">Enter room name:</label>
                            <input
                                placeholder="Room"
                                className="joinInput"
                                type="text"
                                value={room}
                                onChange={handleRoomChange}
                                onKeyDown={handleKeyDown}
                                maxLength={MAX_LENGTH}
                            />
                            <div className={`characterCount ${room.length >= MAX_LENGTH ? 'limit' : room.length >= MAX_LENGTH * 0.8 ? 'warning' : ''}`}>
                                {room.length}/{MAX_LENGTH}
                            </div>
                        </div>
                        <ProfilePictureSelector 
                            selectedPicture={profilePicture}
                            onSelectPicture={handlePictureSelect}
                        />
                    </div>
                    <button
                        className="joinButton"
                        type="button"
                        onClick={handleJoin}
                        disabled={!name || !room}
                    >Join</button>
                </div>
            </div>
        </div>
    )
};

export default Join;