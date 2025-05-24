import React from "react";
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

import "./UsersList.css";
import onlineIcon from "../../icons/onlineIcon.png";

const avatarMap = {
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

const UsersList = ({ users }) => (
  <div className="usersContainer">
    <div className="topBar">
      <h3>Active Users {users.length}/15</h3>
    </div>
    <div className="usersList">
      {users.map((user, index) => (
        <div key={index} className={`activeUser ${user.color}`}>
          <img src={onlineIcon} alt="online" />
          <div className="userAvatar">
            <img src={avatarMap[user.picture] || avatarMap["avatar1"]} alt={user.name} />
          </div>
          <div className="userName">{user.name}</div>
        </div>
      ))}
    </div>
  </div>
);

export default UsersList;