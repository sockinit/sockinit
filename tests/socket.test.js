var tape = require('tape');
var io = require('socket.io-client');
var redisClient = require('../server/client.js');

var server = require('../server/app.js').server;
var socketURL = 'http://localhost:3000';
var options ={
  transports: ['websocket'],
  'force new connection': true
};
var chatMessage1 = JSON.stringify({
          userName : 'Aria',
          img : 'someimagestring',
          message : 'Hello'
});

tape('Should be able to broadcast messages', function(t){
  var client1, client2, client3;
  var messages = 0;

  var checkMessage = function(client){
    client.on('chat message', function(obj){
      t.equal(JSON.parse(obj).userName,'Aria','Message broadcasted.');
      client.disconnect();
      messages++;
      if(messages === 3){
        t.end();
      };
    });
  };

  client1 = io.connect(socketURL, options);
  checkMessage(client1);

  client1.on('connect', function(data){
    client2 = io.connect(socketURL, options);
    checkMessage(client2);

    client2.on('connect', function(data){
      client3 = io.connect(socketURL, options);
      checkMessage(client3);

      client3.on('connect', function(data){
        client2.emit('chat message', chatMessage1);
      });
    });
  });
});



tape('teardown',function(t){
  server.close();
  redisClient.quit();
  t.end();
});
