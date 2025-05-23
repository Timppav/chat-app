import React, { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { IoMdHappy } from "react-icons/io";

import "./Input.css";
import sendIcon from "../../icons/sendIcon.png";

const MAX_LENGTH = 500;

const Input = ({ message, setMessage, sendMessage }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const textareaRef = useRef(null);

    const onEmojiClick = (emojiData) => {
        setMessage(prevMessage => prevMessage + emojiData.emoji);
    };

    const toggleEmojiPicker = (event) => {
        event.preventDefault();
        setShowEmojiPicker(prevState => !prevState);
    }

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setMessage(newValue);
    }

    const handleSendMessage = (event) => {
        event.preventDefault();
        if (message.trim() && message.length <= MAX_LENGTH) {
            sendMessage(event);
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage(event);
        }
    };

    const handleFocus = () => {
        setTimeout(() => {
            if (textareaRef.current) {
                textareaRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
        }, 200);
    }

    useEffect(() => {
        const textarea = textareaRef.current;

        if (textarea) {
            const minHeight = parseFloat(getComputedStyle(textarea).minHeight);
            const maxHeight = parseFloat(getComputedStyle(textarea).maxHeight);

            textarea.style.padding = "5px";
            textarea.style.height = minHeight + "px";

            const scrollHeight = textarea.scrollHeight;

            if (scrollHeight <= minHeight) {
                textarea.style.height = minHeight + "px";
                textarea.style.overflowY = "hidden";
                textarea.style.padding = "19px 5px";
            } else {
                textarea.style.padding = "5px";
                if (scrollHeight <= maxHeight) {
                    textarea.style.height = scrollHeight + "px";
                } else {
                    textarea.style.overflowY = "scroll";
                    textarea.style.height = maxHeight + "px";
                }
            }
        }
    }, [message]);

    const isOverLimit = message.length > MAX_LENGTH;
    const isNearLimit = message.length >= MAX_LENGTH * 0.8;

    return (
        <form className="form">
            <div className="inputContainer">
                <div className={`chatCharacterCount ${isOverLimit ? 'limit' : isNearLimit ? 'warning' : ''}`}>
                        <p>{message.length}/{MAX_LENGTH}</p>
                </div>
                <div className="emojiPickerContainer">
                    {showEmojiPicker && (
                        <div className="emojiPicker">
                            <EmojiPicker onEmojiClick={onEmojiClick} />
                        </div>
                    )}
                </div>
                <div className="inputWrapper">
                    <button className="emojiButton" onClick={toggleEmojiPicker}><IoMdHappy size={20} /></button>
                    <textarea 
                        ref={textareaRef}
                        className="input"
                        placeholder="Type a message..."
                        value={message}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onFocus={handleFocus}
                        rows={1}
                    />
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