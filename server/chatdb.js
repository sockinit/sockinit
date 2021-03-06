var io = require("./app.js").io;
var client = require('./client.js');

io.on('connection', function(socket){
    console.log('socket---->', socket);
  retrieveChats(client,function(reply){
    io.sockets.in(socket.id).emit('connected', reply);
  });
    console.log('connection event fired: a user just connected');
    socket.on('chat message', function(messageObj){

        socket.userName = JSON.parse(messageObj).userName;

        console.log('chat message event received server side:  ' + messageObj);
        var jsonObj = ammendObj(messageObj);
        addToDb(client, jsonObj, function(reply) {
            console.log("message saved to db");
        });
        io.emit( 'chat message', jsonObj );
    });
    socket.on('disconnect', function(){
        console.log('disconnect event fired!!');

        io.emit('user disconnect', socket.userName);

    });
    socket.on('user typing', function(){
        io.emit('user typing');
    });
});

function ammendObj (obj){
    var dateTime = getDateTime();
    obj = JSON.parse(obj);
    obj.date = dateTime[0];
    obj.time = dateTime[1];
    return JSON.stringify(obj);
}

function getDateTime(){
    var dateObj = new Date();
    var month = dateObj.getMonth() + 1;
    var date = dateObj.getDate() + "/" + month + "/" + dateObj.getFullYear();
    var time = dateObj.getHours() + ":" + dateObj.getMinutes();
    return [date, time];
}

function addToDb(client, messageObj, callback) {
    client.rpush('chats', messageObj, function(err, reply) {
        if(err){
            console.log(err);
        } else {
            callback(reply);
        }
    });
}

function retrieveChats(client, callback){
    client.LRANGE('chats', 0, -1, function(err, reply){
        if(err){
            console.log(err);
        } else {
            callback(reply);
        }
    });
}

module.exports = {
    addToDb : addToDb,
    retrieveChats: retrieveChats
};
