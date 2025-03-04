import { useState } from "react";
import "./App.css";
import ChatbotIcon from "./components/ChatbotIcon";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage ";
import { companyInfo } from "./CompanyInfo";

function App() {
  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat: true,
      role: "model",
      text: companyInfo,
    },
  ]);

  const generateBotResponse = async (history) => {
    const formattedHistory = history.map(({ role, text }) => ({
      role: role === "bot" ? "model" : "user", // Convert 'bot' to 'model'
      parts: [{ text }],
    }));

    const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${apiKey}`;

    const requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contents: formattedHistory }),
    };

    try {
      if (!apiKey) {
        throw new Error(
          "REACT_APP_GEMINI_API_KEY is missing in environment variables."
        );
      }

      const response = await fetch(apiUrl, requestOption);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Something went wrong!");
      }

      const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!botResponse) {
        throw new Error("Invalid response format from API");
      }

      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { role: "bot", text: botResponse }, // Keep 'bot' for UI but send 'model' to API
      ]);
    } catch (error) {
      console.error(error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <div className="chatbot-popup">
        {/* Chatbot Header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">ChatBot</h2>
          </div>
        </div>
        {/* Chatbot body */}
        <div className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              👋 Salom hurmatli student sizga qanday yordam bera olaman?
            </p>
          </div>
          {/* Render the chat history dynamically */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>
        {/* Chatbot Footer */}
        <div className="chat-footer">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
