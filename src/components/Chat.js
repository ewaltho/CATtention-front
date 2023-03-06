import React, { useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

function ChatFeature() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSend = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("chat message", message); // Emit the message to the server
      setMessage("");
    }
  };

  socket.on("connect", () => {
    console.log("connected to server");
  });

  socket.on("disconnect", () => {
    console.log("disconnected from server");
  });

  socket.on("chat message", (msg) => {
    // Listen for incoming messages from the server
    setMessages([...messages, msg]);
  });

  return (
    <div className="chat-box">
      <h1>CATtention Chat</h1>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <form onSubmit={handleSend}>
        <input type="text" value={message} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatFeature;
