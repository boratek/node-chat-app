const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users.js');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUsersList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room.`));
    }
  });

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUsersList(params.room));

    // emit to single connection
    // socket.emit from Admin text Welcome to chat app
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat App'));

    // socket.broadcast.emit from Admin text New user joined
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params. name} has joined.`));

    callback();
  });

  socket.on('createMessage', (newMessage, callback) => {
    console.log('Chat new message:', newMessage);
    // emit to all connections
    // io.emit('newMessage', {
    //   from: newMessage.from,
    //   text: newMessage.text,
    //   createdAt: new Date().getTime()
    // });

    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });
});



server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
