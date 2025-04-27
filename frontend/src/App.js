import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (message !== "") {
      const messageData = {
        message: message,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="App">
      <h1>Real-Time Chat</h1>
      <input
        type="text"
        value={message}
        placeholder="Write your message..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <div>
        {messageList.map((msg, index) => (
          <div key={index}>
            <h4>{msg.message} <span>({msg.time})</span></h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
