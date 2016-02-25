
var socket = io();
var userInpt = document.getElementById('input');
var userName = 'Barney Stinson';
var img = 'https://images-na.ssl-images-amazon.com/images/I/31RscUfLovL._UX250_.jpg';

document.getElementById('button').addEventListener('click', function(e){
    e.preventDefault();
    var messageObj = {};
    messageObj.message = userInpt.value;
    messageObj.userName = userName;
    messageObj.img = img;
    // add image to object
    messageObj = JSON.stringify(messageObj);

    socket.emit('chat message', messageObj);
    userInpt.value = '';
    return false;
});

socket.on('connect', function() {
  console.log('CONNECTED TO THE CLIENT - NOT TESTSS');
    var usrCo = document.createElement('li');
    usrCo.className = 'user';
    usrCo.innerHTML = userName + ' has joined the chat';
    document.getElementById('messages').appendChild(usrCo);
});

socket.on('chat message', function(messageObj){
    console.log('chat message received client side');
    messageObj = JSON.parse(messageObj);

    var chat = document.createElement('li');

    var box_img = document.createElement('div');
    box_img.className = 'box-img';

    var img = document.createElement('img');
    img.setAttribute('src', messageObj.img);
    box_img.appendChild(img);
    chat.appendChild(box_img);

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
    usrDis.className = 'user';
    usrDis.innerHTML = 'A user just left the conversation!';
    document.getElementById('messages').appendChild(usrDis);
});
userInpt.addEventListener('input', function(){
    socket.emit('user typing');
});
socket.on('user typing', function(){
    var usrTyp = document.getElementById('typing');
    usrTyp.style.display = 'block';
    setTimeout(function() {usrTyp.style.display = 'none';}, 2000);

});
