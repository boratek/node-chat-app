// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)


class Person {
  constructor (name, age) {
    console.log(name, age);
  }
}

class Users {

  constructor () {
    this.users = [];
  }

  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);

    return user;
  }

  // Return user that was removed
  removeUser (id) {
    var user = this.getUser(id);

    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
  }

  getUser (id) {
    return this.users.filter((user) => user.id === id)[0];
  }

  getUsersList (room) {
    var users = this.users.filter((user) => user.room === room);
    var namesArr = users.map((user) => user.name);

    return namesArr;
  }
}

module.exports = {Users};
