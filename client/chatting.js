
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

socket.on('chat message', function(messageObj){
    console.log('chat message received client side');
    messageObj = JSON.parse(messageObj);

    var chat = document.createElement('li');
    var img = document.createElement('img');
    img.setAttribute('src', messageObj.img);
    chat.appendChild(img);

    var userName = document.createElement('span');
    userName.className = "user-name";
    userName.innerHTML = messageObj.userName;
    chat.appendChild(userName);

    var time = document.createElement('span');
    time.className = "time";
    time.innerHTML = messageObj.time;
    chat.appendChild(time);

    var message = document.createElement('div');
    message.className = "message";
    message.innerHTML = messageObj.message;
    chat.appendChild(message);

    document.getElementById('messages').appendChild(chat);
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
