var redisMock = require('redis-mock');
var chatdb = require('../server/chatdb.js');
var tape = require('tape');
var clientMock = redisMock.createClient();

var redis = require('redis');
var client = redis.createClient();

tape('Function addTodb gets response from the database', function(t){
    chatdb.addToDb(clientMock, 'Norbert', 'someimagestring', 'hello world', '21/01/1990', '00:27', function(reply){
        var expected = 'number';
        var actual = reply;
        t.equal(typeof actual, expected);
        t.end();
    });
});

tape('Function retrieveChats retrieve the list chats from the database', function(t){
    chatdb.retrieveChats(clientMock, function(reply){
        var expected = '?';
        var actual = reply;
        t.equal(actual, expected);
        t.end();
    });
});
