import React, { useState} from "react";
import { useNavigate } from "react-router-dom";

import "./Join.css";

const Join = () => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const navigate = useNavigate();

    const handleJoin = () => {
        if (name && room) {
            navigate(`/chat?name=${name}&room=${room}`);
        }
    };

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join a chatroom</h1>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /></div>
                <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /></div>
            </div>
            <button
                className={`button mt-20 ${(!name || !room) ? "button-disabled" : ""}`}
                type="button"
                onClick={handleJoin}
                disabled={!name || !room}
            >Join</button>
            {/* <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                <button className="button mt-20" type="submit">Join</button>
            </Link> */}
        </div>
    )
};

export default Join;