import React from "react";

import "./Message.css";
import avatar1 from "../../avatars/avatar1.png";
import avatar2 from "../../avatars/avatar2.png";
import avatar3 from "../../avatars/avatar3.png";
import avatar4 from "../../avatars/avatar4.png";
import avatar5 from "../../avatars/avatar5.png";
import avatar6 from "../../avatars/avatar6.png";
import avatar7 from "../../avatars/avatar7.png";
import avatar8 from "../../avatars/avatar8.png";
import avatar9 from "../../avatars/avatar9.png";
import avatar10 from "../../avatars/avatar10.png";
import systemAvatar from "../../avatars/system-avatar.png";

const avatars = {
  "avatar1": avatar1,
  "avatar2": avatar2,
  "avatar3": avatar3,
  "avatar4": avatar4,
  "avatar5": avatar5,
  "avatar6": avatar6,
  "avatar7": avatar7,
  "avatar8": avatar8,
  "avatar9": avatar9,
  "avatar10": avatar10,
  "system": systemAvatar
};

const Message = ({ message: { user, text, picture, timestamp, color }, name }) => {
    let isSentByCurrentUser = false;

    if (user.trim().toLowerCase() === name.trim().toLowerCase()) {
        isSentByCurrentUser = true;
    }

    const avatarImage = avatars[picture] || avatars["avatar1"];

    const formattedTime = timestamp ? new Date(timestamp).toLocaleDateString("en-GB", { hour: "2-digit", minute: "2-digit"}) : "";

    return (
        isSentByCurrentUser
            ? (
                <div className="messageContainer alignRight">
                    <p className="sentText">{user}</p>
                    <div className="messageContentWrapper">
                        {timestamp && <span className="timestamp">{formattedTime}</span>}
                        <div className={`messageBox ${color}`}>
                            <p className="messageText">{text}</p>
                        </div>
                        <div className="profilePicture">
                            <img src={avatarImage} alt={user} className="avatarImg" />
                        </div>
                    </div>
                </div>
            )
            : (
                <div className="messageContainer alignLeft">
                    <p className="sentText">{user}</p>
                    <div className="messageContentWrapper">
                        <div className="profilePicture">
                            <img src={avatarImage} alt={user} className="avatarImg" />
                        </div>
                        <div className={`messageBox ${color}`}>
                            <p className="messageText">{text}</p>
                        </div>
                        {timestamp && <span className="timestamp">{formattedTime}</span>}
                    </div>
                </div>
            )
    )
};

export default Message;