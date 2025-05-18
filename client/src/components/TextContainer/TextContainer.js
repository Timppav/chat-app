import React from "react";

import onlineIcon from "../../icons/onlineIcon.png";
import "./TextContainer.css";

const TextContainer = ({ users }) => (
    <div className="textContainer">
        <div>
            <h1>Realtime chat application</h1>
        </div>
        {
            users
                ? (
                    <div>
                        <h1>Users online:</h1>
                        <div className="activeContainer">
                            <h2>
                                {users.map(({ id, name }) => (
                                    <div key={id} className="activeItem">
                                        {name}
                                        <img alt="online icon" src={onlineIcon} />
                                    </div>
                                ))}
                            </h2>
                        </div>
                    </div>
                )
                : null
        }
    </div>
);

export default TextContainer;