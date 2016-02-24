var redisMock = require('redis-mock');
var userdb = require('../server/userdb.js');
var tape = require('tape');
var clientMock = redisMock.createClient();

tape('Function successfully adds user to "users set"', function(t){
        userdb.addUsertoUserSet(clientMock, 'tom', function(reply){
        var expected = 1;
        var actual = reply;
        t.equal(actual, expected, 'user set created');
        t.end();
    });
});

tape('Function successfully adds a second user to "users set"', function(t){
        userdb.addUsertoUserSet(clientMock, 'ivan', function(reply){
        var expected = 1;
        var actual = reply;
        t.equal(actual, expected, 'second user set created');
        t.end();
    });
});


tape('Function successfully creates a hash for a user', function(t){
    userdb.addUser(clientMock, 'username', 'tom', 'password', 'secret', function(reply){
        var expected = 'OK';
        var actual = reply;
        t.equal(actual, expected, 'user hash created');
        t.end();
    });
});
