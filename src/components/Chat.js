import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

function ChatFeature({ roomData, userObject}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState({});
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setRoom(roomData);
   
    console.log("Listening for incoming messages...");
  
    socket.on("chat message", (msg) => {
      console.log("Received message:", msg);
  
  
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: msg.message, timestamp: msg.timestamp, roomCode: msg.roomCode, userObject: msg.userObject },
      ]);
            setUser (msg.userObject);
    });
  
    // Join the room when the component mounts
    socket.emit("join room", roomData.code, { userObject });

    socket.on("users in room", (userList) => {
      console.log("Received user list:", userList);
      setUsers(userList);
    });

  
    return () => {
      socket.off("chat message");
      console.log("Stopped listening for incoming messages...");
    };
  }, [roomData, userObject, user]);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSend = (event) => {
    event.preventDefault();
    if (message) {
   
      // Emit the message to the server
      console.log("Sending message:", message);
      socket.emit("chat message", { roomCode: room.code, message: message, userObject: userObject});
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
        <div className="users">
        <h2>Users in Room:</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.username}</li>
          ))}
        </ul>
      </div>
      <div className="messages">
        {messages.map(({ message, timestamp, userObject }, index) => (
          <div key={index}>
            <span className="timestamp">{userObject ? `${timestamp} - ` : ''}</span>
            <span className="username">{userObject && userObject.username}</span>
            <br />
            <span className="message">{message}</span>
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
