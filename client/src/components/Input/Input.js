import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { IoMdHappy } from "react-icons/io";

import "./Input.css";
import sendIcon from "../../icons/sendIcon.png";

const Input = ({ message, setMessage, sendMessage }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const onEmojiClick = (emojiData) => {
        setMessage(prevMessage => prevMessage + emojiData.emoji);
    };

    const toggleEmojiPicker = (event) => {
        event.preventDefault();
        setShowEmojiPicker(prevState => !prevState);
    }

    return (
        <form className="form">
            <div className="inputContainer">
                <div className="emojiPickerContainer">
                    {showEmojiPicker && (
                        <div className="emojiPicker">
                            <EmojiPicker onEmojiClick={onEmojiClick} />
                        </div>
                    )}
                </div>
                <div className="inputWrapper">
                    <button className="emojiButton" onClick={toggleEmojiPicker}><IoMdHappy size={20} /></button>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        onKeyDown={event => event.key === "Enter" ? sendMessage(event) : null}
                    />
                    <button className="sendButton" onClick={(event) => sendMessage(event)}>
                        <img className="sendIcon" src={sendIcon} alt="send" />
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Input;