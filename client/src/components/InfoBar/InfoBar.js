import React from "react";
import { useNavigate } from "react-router-dom";

import closeIcon from "../../icons/closeIcon.png";

import "./InfoBar.css";

const InfoBar = ({ room }) =>  {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate("/");
    };

    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <h3>{room}</h3>
            </div>
            <div className="rightInnerContainer">
                <button
                    type="button"
                    className="closeButton"
                    onClick={handleClose}
                >
                    <img className="closeIcon" src={closeIcon} alt="close" />
                </button>
            </div>
        </div>
    );
}

export default InfoBar;