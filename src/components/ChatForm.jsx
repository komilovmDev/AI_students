import React, { useRef } from "react";

const ChatForm = ({ setChatHistory, generateBotResponse, chatHistory }) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    setChatHistory((history) => [...history,{ role: "user", text: userMessage },]);

    setTimeout(() => {
      setChatHistory((history) => [ ...history,{ role: "model", text: "Thinking..." },]);
    }, 600);

    generateBotResponse([...chatHistory, { role: "user", text: `Salom: ${userMessage}` }]);
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
      <button class="material-symbols-rounded">arrow_upward</button>
    </form>
  );
};

export default ChatForm;
