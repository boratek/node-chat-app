const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: 1,
      name: 'Alice',
      room: 'Rabbits'
    }, {
      id: 2,
      name: 'Bart',
      room: 'Bugs'
    }, {
      id: 3,
      name: 'Gresmir',
      room: 'Rabbits'
    }];
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '1234',
      name: 'Bart',
      room: 'Devlopers'
    };

    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove the user', () => {
    var id = 1;
    var userRemoved = users.removeUser(id);

    var userShouldBeRemoved = users.getUser(id);
    expect(userRemoved.id).toBe(id);
    expect(users.users.length).toBe(2);
    expect(userShouldBeRemoved).toBe(undefined);
  });

  it('should not remove the user', () => {
    var id = 13;
    var userRemoved = users.removeUser(id);

    expect(userRemoved).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    var id = 2;
    var user = users.getUser(id);

    expect(user.id).toBe(id);
  });

  it('should not find user', () => {
    var user = users.getUser(4);

    expect(user).toBe(undefined);
  });

  it('should return names of Rabbits', () => {
    var userList = users.getUsersList('Rabbits');

    expect(userList).toEqual(['Alice', 'Gresmir']);
  });

  it('should return names of Bugs', () => {
    var userList = users.getUsersList('Bugs');

    expect(userList).toEqual(['Bart']);
  });
});
