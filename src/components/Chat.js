import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

function ChatFeature({ roomData }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState({});

  useEffect(() => {
    // Set up the room data and listen for incoming messages
    setRoom(roomData);
    console.log("Listening for incoming messages...");

    socket.on("chat message", (msg) => {
      // Listen for incoming messages from the server
      console.log("Received message:", msg);

      if (msg.roomCode === roomData.code) {
        setMessages(prevMessages => [...prevMessages, msg]);
      }
    });

    return () => {
      socket.off("chat message");
      console.log("Stopped listening for incoming messages...");
    };
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

      // Emit the message to the server
      console.log("Sending message:", fullMessage);
      socket.emit("chat message", { roomCode: room.code, message: fullMessage });
      setMessage("");
    }
  };

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
    {message.message}
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
