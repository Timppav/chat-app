import React from "react";
import "./ProfilePictureSelector.css";

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

const avatars = [
  { name: "avatar1", image: avatar1 },
  { name: "avatar2", image: avatar2 },
  { name: "avatar3", image: avatar3 },
  { name: "avatar4", image: avatar4 },
  { name: "avatar5", image: avatar5 },
  { name: "avatar6", image: avatar6 },
  { name: "avatar7", image: avatar7 },
  { name: "avatar8", image: avatar8 },
  { name: "avatar9", image: avatar9 },
  { name: "avatar10", image: avatar10 }
];

const ProfilePictureSelector = ({ selectedPicture, onSelectPicture }) => {
    return (
        <div className="profilePictureContainer">
            <label className="pictureLabel">Choose your avatar:</label>
            <div className="pictureGrid">
                {avatars.map((avatar, index) => (
                    <div
                        key={index}
                        className={`pictureOption ${selectedPicture === avatar.name || selectedPicture === avatar.image ? "selected" : ""}`}
                        onClick={() => onSelectPicture(avatar.name)}
                    >
                        <img src={avatar.image} alt={`Avatar ${index + 1}`} className="avatarImage" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfilePictureSelector;