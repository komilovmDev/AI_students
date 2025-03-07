import React, { useRef } from "react";
import { FiSend } from "react-icons/fi";

const ChatForm = ({ setChatHistory, generateBotResponse, chatHistory }) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    // 1️⃣ Foydalanuvchi xabarini qo‘shamiz
    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
      { role: "model", text: "Thinking...", id: "thinking" }, // Unique ID qo‘shamiz
    ]);

    // 2️⃣ Bot javobi generatsiyasiga to‘g‘ri tarixni uzatamiz
    generateBotResponse([
      ...chatHistory,
      { role: "user", text: userMessage },
    ]);
  };

  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Message..."
        className="message-input"
        required
      />
      <button type="submit" className="material-symbols-rounded">
        <FiSend />
      </button>
    </form>
  );
};

export default ChatForm;
