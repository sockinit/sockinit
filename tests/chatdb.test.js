var redisMock = require('redis-mock');
var chatdb = require('../server/chatdb.js');
var tape = require('tape');
var server = require('../server/app.js').server;
var clientMock = redisMock.createClient();
var client = require('../server/client.js');

var testObj = {
  userName : 'Norbert',
  img : 'someimagestring',
  message : 'hello world',
  date : '21/01/1990',
  time : '00:27'
};

tape('Function addTodb gets response from the database', function(t){
    chatdb.addToDb(clientMock, testObj, function(reply){
        var expected = 'number';
        var actual = reply;
        t.equal(typeof actual, expected);
        t.end();
    });
});

tape('Function retrieveChats retrieves an array', function(t){
    chatdb.retrieveChats(client, function(reply){
        var actual =  reply instanceof Array;
        t.ok(actual, 'Array is returned');
        t.end();
    });
});
