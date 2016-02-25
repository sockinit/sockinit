var redisMock = require('redis-mock');
var userdb = require('../server/userdb.js');
var tape = require('tape');
var clientMock = redisMock.createClient();

tape('Function addUsertoUserSet successfully adds user to "users set"', function(t){
        userdb.addUsertoUserSet(clientMock, 'tom', function(reply){
        var expected = 1;
        var actual = reply;
        t.equal(actual, expected, 'user set created');
        t.end();
    });
});

tape('Function addUsertoUserSet successfully adds a second user to "users set"', function(t){
        userdb.addUsertoUserSet(clientMock, 'ivan', function(reply){
        var expected = 1;
        var actual = reply;
        t.equal(actual, expected, 'second user set created');
        t.end();
    });
});


tape('Function addUser successfully creates a hash for a user', function(t){
    userdb.addUser(clientMock, 'username', 'tom', 'password', 'secret', function(reply){
        var expected = 'OK';
        var actual = reply;
        t.equal(actual, expected, 'user hash created');
        t.end();
    });
});

tape('Function fetchUserNames successfully fetches the "usernames" set', function(t){
    userdb.fetchUserNames(clientMock, function(reply){
        var expected = true;
        var actual = Array.isArray(reply);
        console.log('array ------>', reply);
        t.equal(actual, expected, 'fetchUserNames function returns an array');
        t.end();
    });
});

tape('Function checkName checks whether name is already in db', function(t){
    userdb.fetchUserNames(clientMock, function(reply){
        var expected = true;
        var actual = userdb.checkName(clientMock, reply, 'tom');
        t.equal(actual, expected, 'checkName function returns true for name already in set');
        t.end();
    });
});

tape('Function checkName checks whether name is already in db', function(t){
    userdb.fetchUserNames(clientMock, function(reply){
        var expected = false;
        var actual = userdb.checkName(clientMock, reply, 'jack');
        t.equal(actual, expected, 'checkName function returns false for name not in set');
        t.end();
    });
});
