import React, { useState, useEffect, useRef } from 'react';
import '../assets/css/Room.css';


function ChatFeature({ roomData, userObject, currentUser, socket}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState({});
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const messageContainer = useRef(null);

  useEffect(() => {
    setRoom(roomData);

    console.log("Listening for incoming messages...");

    socket.on("chat message", (msg) => {
   

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
      // sets the scroll position to the bottom of the chat box when a new message is received 
      // with a delay so that the message can be rendered first without it cutting off mid auto scroll
      setTimeout(() => {
        messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
      }, 10);


    });

 

    // Join the room when the component mounts
   socket.emit("join room", roomData.code, {userObject:{ ...userObject, socketId: socket.id }});

    socket.on("users in room", (userList) => {
  
      setUsers(userList);
    });


    return () => {
      socket.off("chat message");
 

    };
  }, [roomData, userObject, user]);



  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSend = (event) => {
    event.preventDefault();
    if (message) {
      // Emit the message to the server
      socket.emit("chat message", {
        roomCode: room.code,
        message: message,
        userObject: userObject,
      });
       // sets the scroll position to the bottom of the chat box when a new message is sent 
      // with a delay so that the message can be rendered first without it cutting off mid auto scroll
      setTimeout(() => {
        messageContainer.current.scrollTop =
          messageContainer.current.scrollHeight;
      }, 10);
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
      <div className="messages" ref={messageContainer}>
      {messages.map(({ message, timestamp, userObject }, index) => {
      const isSentMessage = userObject && userObject.username === currentUser;
      const messageClass = isSentMessage ? 'sent-message' : 'received-message';
      
      return (
        <div key={index} className={`message ${messageClass}`}>
          <span className="timestamp">{userObject ? `${timestamp} - ` : ''}</span>
          <span className="username">{userObject && userObject.username}</span>
          <br />
          <span className="message">{message}</span>
        </div>
      );
    })}
    </div>
        <form className="send-box" onSubmit={handleSend}>
          <input className="text-input" type="text" value={message} onChange={handleInputChange} placeholder="Type your message here..."/>
          <button type="submit">Send</button>
        </form>
      </div>
    );
}

export default ChatFeature;
