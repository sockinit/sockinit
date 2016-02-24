var io = require("./app.js").io;

io.on('connection', function(socket){
    io.emit('connect');
    console.log('connection event fired: a user just connected');
    socket.on('chat message', function(messageObj){
        console.log('chat message event received server side:  ' + messageObj);
        var dateTime = getDateTime(new Date());
        addToDb(messageObj.userName, messageObj.img, messageObj.message, dateTime[0], dateTime[1]);
        io.emit('chat message', messageObj);
    });
    socket.on('disconnect', function(){
        console.log('disconnect event fired!!');
        io.emit('user disconnect');
    });
    socket.on('user typing', function(){
        console.log('user is typing');
        io.emit('user typing');
    });
});

function getDateTime(dateObj){
    var month = dateObj.getMonth() + 1;
    var date = dateObj.getDate() + "/" + month + "/" + dateObj.getFullYear();
    var time = dateObj.getHours() + ":" + dateObj.getMinutes();
    return [date, time];
}

function addToDb(client, userName, img, message, date, time, callback) {
    console.log(client);
    var messageObj = {
        userName : userName,
        img : img,
        message : message,
        date : date,
        time : time
    };
    client.rpush('chats', JSON.stringify(messageObj), function(err, reply) {
        if(err){
            console.log(err);
        } else {
            callback(reply);
        }
    });
}

function retrieveChats(client, callback){
    console.log("klasdfkjsadf" ,  client);
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
