import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3001");

function ChatFeature({ roomData }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState({});

  useEffect(() => {
    async function fetchRoom() {
      if (!roomData) return; // Exit early if roomData is not available
      const response = await axios.get(`http://localhost:3001/api/rooms/${roomData.code}`);
      setRoom(response.data);
    }
    fetchRoom();
  }, [roomData]);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSend = (event) => {
    event.preventDefault();
    if (message) {
      const currentTime = new Date();
      const timestamp = currentTime.toLocaleTimeString();
      const fullMessage = `[${timestamp}] ${message}`; // Add timestamp to message
      socket.emit("chat message", fullMessage); // Emit the message to the server
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
      <div className="room-details">
        <p>Room Name: {room.room_name}</p>
        <p>Room Code: {room.code}</p>
      </div>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index}>
            <span className="timestamp">{message.timestamp}</span>
            {message}
          </div>
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
