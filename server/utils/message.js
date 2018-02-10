var moment = require('moment');

var generateMessage = (from, text) => {
  var timestamp = moment().valueOf();
  var date = moment(timestamp);
  var createdAt = date.format('h:mm a');

  return {from, text, createdAt: timestamp};
};

var generateLocationMessage = (from, latitude, longitude) => {
  var timestamp = moment().valueOf();
  var date = moment(timestamp);
  var createdAt = date.format('h:mm a');

  return {
    from,
    url: `https://www.google.com/maps?q${latitude},${longitude}`,
    createdAt: timestamp
  }
};

module.exports = {generateMessage, generateLocationMessage};
