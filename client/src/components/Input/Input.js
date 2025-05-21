import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { IoMdHappy } from "react-icons/io";

import "./Input.css";
import sendIcon from "../../icons/sendIcon.png";

const MAX_LENGTH = 500;

const Input = ({ message, setMessage, sendMessage }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const onEmojiClick = (emojiData) => {
        setMessage(prevMessage => prevMessage + emojiData.emoji);
        // const newMessage = message + emojiData.emoji;
        // if (newMessage.length <= MAX_LENGTH) {
        //     setMessage(newMessage);
        // }
    };

    const toggleEmojiPicker = (event) => {
        event.preventDefault();
        setShowEmojiPicker(prevState => !prevState);
    }

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setMessage(newValue);
        // if (newValue.length <= MAX_LENGTH) {
        //     setMessage(newValue);
        // } 
    }

    const handleSendMessage = (event) => {
        event.preventDefault();
        if (message.trim() && message.length <= MAX_LENGTH) {
            sendMessage(event);
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSendMessage(event);
        }
    };

    const isOverLimit = message.length > MAX_LENGTH;
    const isNearLimit = message.length >= MAX_LENGTH * 0.8;

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
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />
                    <div className={`chatCharacterCount ${isOverLimit ? 'limit' : isNearLimit ? 'warning' : ''}`}>
                        <p>{message.length}/{MAX_LENGTH}</p>
                    </div>
                    <button
                        type="submit"
                        className="sendButton"
                        disabled={!message.trim() || isOverLimit}
                        onClick={handleSendMessage}
                    >
                        <img className="sendIcon" src={sendIcon} alt="send" />
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Input;