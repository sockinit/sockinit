var redisMock = require('redis-mock');
var clientMock = redisMock.createClient();
var userdb = require('../server/userdb.js');
var tape = require('tape');

tape('Function successfully adds a user to the database', function(t){
    userdb.addUser()
})
