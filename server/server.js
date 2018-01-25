const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });

  // emit to single connection
  // socket.emit('newMessage', {
  //   from: 'Bart',
  //   text: 'New chat message',
  //   createdAt: 345
  // });

  socket.on('createMessage', (newMessage) => {
    console.log('Chat new message:', newMessage);
    // emit to all connections
    io.emit('newMessage', {
      from: newMessage.from,
      text: newMessage.text,
      createdAt: new Date().getTime()
    });
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
