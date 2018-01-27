var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

  // socket.emit('createMessage', {
  //   to: 'Bart',
  //   text: 'Response on message'
  // })
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('New Message:', message);
});

socket.emit('createMessage', {
  from: 'Bart',
  text: 'Hello'
}, function (msg) {
  console.log('Works!', msg);
});
