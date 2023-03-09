import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/Room.css";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

function ChatFeature({ roomData, userObject }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState({});
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const storedRoom = JSON.parse(localStorage.getItem("roomPrefs"));
    if (storedRoom) {
      console.log(storedRoom);
      if (!storedRoom.roomCode) {
        console.log(storedRoom.roomCode);
        navigate("/joinchat");
      } else {
        socket.emit("join room", storedRoom.code, { userObject });
      }
    } else {
      console.log("No stored room found in localStorage.");
      navigate("/joinchat");
    }
  }, []);

  useEffect(() => {
    setRoom(roomData);

    console.log("Listening for incoming messages...");

    socket.on("chat message", (msg) => {
      console.log("Received message:", msg);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: msg.message,
          timestamp: msg.timestamp,
          roomCode: msg.roomCode,
          userObject: msg.userObject,
        },
      ]);
      setUser(msg.userObject);
    });

    // Join the room when the component mounts
    socket.emit("join room", roomData.code, { userObject });

    socket.on("users in room", (userList) => {
      console.log("Received user list:", userList);
      setUsers(userList);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
      setUsers([]); // Reset the user list when the socket disconnects
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
      socket.emit("chat message", {
        roomCode: room.code,
        message: message,
        userObject: userObject,
      });
      setMessage("");
    }
  };

  // TODO: remove room name label and just render state value
  return (
    <div className="chat-box">
      <div className="room-details">
        <p className="room-title">{room.room_name}</p>
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
            <span className="timestamp">
              {userObject ? `${timestamp} - ` : ""}
            </span>
            <span className="username">
              {userObject && userObject.username}
            </span>
            <br />
            <span className="message">{message}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend}>
        <input
          className="text-input"
          type="text"
          value={message}
          onChange={handleInputChange}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatFeature;
