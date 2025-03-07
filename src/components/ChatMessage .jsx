import React from "react";
import ChatbotIcon from "./ChatbotIcon";

const ChatMessage = ({ chat }) => {
  return (
    !chat.hideInChat && (
      <div className={`message ${chat.role === "model" ? "bot-message" : "user-message"}`}>
        {chat.role === "model" && <ChatbotIcon />}
        <p className="message-text">{chat.text}</p>
      </div>
    )
  );
};

export default ChatMessage;
