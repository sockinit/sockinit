var io = require("./app.js").io;

io.on('connection', function(socket){
    console.log('connection event fired: a user just connected');
    socket.on('chat message', function(message){
        console.log('chat message event received server side:  ' + message);
        io.emit('chat message', message);
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
 
