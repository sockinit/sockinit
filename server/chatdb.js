var io = require("./app.js").io;
var client = require('./client.js');

io.on('connection', function(socket){
    io.emit('connect');
    console.log('connection event fired: a user just connected');
    socket.on('chat message', function(messageObj){
        console.log('chat message event received server side:  ' + messageObj);
        var dateTime = getDateTime(new Date());
        messageObj = JSON.parse(messageObj);
        var ammendedObj = {
          userName : messageObj.userName,
          img : messageObj.img,
          message : messageObj.message,
          date : dateTime[0],
          time : dateTime[1]
        };
        ammendedObj = JSON.stringify(ammendedObj);
        addToDb(client, ammendedObj, function(reply) {
          console.log("message saved to db");
        });
        io.emit('chat message', ammendedObj);
    });
    socket.on('disconnect', function(){
        console.log('disconnect event fired!!');
        io.emit('user disconnect');
    });
    socket.on('user typing', function(){
        io.emit('user typing');
    });
});

function getDateTime(dateObj){
    var month = dateObj.getMonth() + 1;
    var date = dateObj.getDate() + "/" + month + "/" + dateObj.getFullYear();
    var time = dateObj.getHours() + ":" + dateObj.getMinutes();
    return [date, time];
}

function addToDb(client, messageObj, callback) {
    // console.log(client);
    client.rpush('chats', messageObj, function(err, reply) {
        if(err){
            console.log(err);
        } else {
            callback(reply);
        }
    });
}

function retrieveChats(client, callback){
    // console.log("klasdfkjsadf" ,  client);
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

// client.smembers('chats', function(err, reply){
//     if(err) {
//         console.log(err);
//     } else {
//         JSON.parse(reply);
//     }
// });
