
var socket = io();
var usrInpt = document.getElementById('input');
var usrName = 'Norbert';

document.getElementById('button').addEventListener('click', function(e){
    e.preventDefault();
    var messageObj = {};
    messageObj.message = usrInpt.value;
    messageObj.userName = usrName;
    // add image to object
    messageObj = JSON.stringify(messageObj);

    socket.emit('chat message', messageObj);
    usrInpt.value = '';
    return false;
});

socket.on('connect', function() {
    var usrCo = document.createElement('li');
    usrCo.innerHTML = 'A user join the chat';
    document.getElementById('messages').appendChild(usrCo);
});

socket.on('chat message', function(message){
    console.log('chat message received client side');
    var msg = document.createElement('li');
    msg.innerHTML = message;
    document.getElementById('messages').appendChild(msg);
});
socket.on('user disconnect', function(){
    var usrDis = document.createElement('li');
    usrDis.innerHTML = 'A user just left the conversation!';
    document.getElementById('messages').appendChild(usrDis);
});
usrInpt.addEventListener('input', function(){
    socket.emit('user typing');
});
socket.on('user typing', function(){
    var usrTyp = document.getElementById('typing');
    usrTyp.style.display = 'block';
    setTimeout(function() {usrTyp.style.display = 'none';}, 2000);

});
console.log("in chatting.js");
