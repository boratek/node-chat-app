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
  // socket.emit from Admin text Welcome to chat app
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to Chat App',
    createdAt: new Date().getTime()
  });

  // socket.broadcast.emit from Admin text New user joined
  socket.broadcast.emit('newMessage', {
      from: 'Admin',
      text: 'New user joined',
      createdAt: new Date().getTime()
  });

  socket.on('createMessage', (newMessage) => {
    console.log('Chat new message:', newMessage);
    // emit to all connections
    // io.emit('newMessage', {
    //   from: newMessage.from,
    //   text: newMessage.text,
    //   createdAt: new Date().getTime()
    // });

    socket.broadcast.emit('newMessage', {
        from: newMessage.from,
        text: newMessage.text,
        createdAt: new Date().getTime()
    });
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
