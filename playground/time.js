const moment = require('moment');

// Jan 1st 1970 00:00:00 am

1000

var date = moment();
// console.log(date.format('MMM'));
// date.add(1, 'day').subtract(2, 'months');
// console.log(date.format('MMM Do, YYYY'));


// HH:mm am/pm
// 6:01 am

var someTimestamp = moment().valueOf();
console.log(someTimestamp);
var date = moment(someTimestamp);
console.log(date.format('h:mm a'));


var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('h:mm a'));
