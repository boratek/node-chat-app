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
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  console.log('submit works');
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val() // to find element with name "message"
  }, function (msg) {
    console.log('Works in form submit!', msg);
  });
  e.preventDefault();
});
