const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React app runs here
    methods: ["GET", "POST"]
  }
});

// Handling socket connection
io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('send_message', (data) => {
    io.emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

app.get('/', (req, res) => {
  res.send('Server is running');
});

server.listen(3001, () => {
  console.log('SERVER RUNNING ON PORT 3001');
});
