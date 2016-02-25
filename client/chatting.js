
var socket = io();
var userInpt = document.getElementById('input');
var userName = window.location.href.split('/')[4] + " ";

var images = [
'http://www.fandomisinthedetails.com/uploads/1/9/2/0/19201953/9606121_orig.jpg?324',
'http://piesnloduiognia.pl/wp-content/uploads/2015/05/Tyrion.jpg',
'http://images.radiotimes.com/namedimage/David_Tennant__Twitter_is_like_being_stalked_by_committee.jpg?quality=85&mode=crop&width=620&height=374&404=tv&url=/uploads/images/original/25601.jpg',
'http://www.the-big-bang-theory.fr/images/Sheldon-Cooper.jpg',
'https://images-na.ssl-images-amazon.com/images/I/31RscUfLovL._UX250_.jpg'
];

function printChat(messageObj) {

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
  userName.innerHTML = messageObj.userName + ' :';
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

}

document.getElementById('button').addEventListener('click', function(e){
    e.preventDefault();
    var messageObj = {};
    messageObj.message = userInpt.value;
    messageObj.userName = userName;
    var index = Math.floor((Math.random() * 10) + 1);
    if (index > 5) { index -= 5; }
    console.log("INDEXXXXXXXXX", index);
    messageObj.img = images[index];
    // add image to object
    messageObj = JSON.stringify(messageObj);

    socket.emit('chat message', messageObj);
    userInpt.value = '';
    return false;
});

socket.on('connected', function(chatHistory) {
  var l = chatHistory.length;
  if(l > 15){
    chatHistory = chatHistory.splice(l-16, l-1);
  }
    chatHistory.forEach(function(item) {
      printChat(item);
    });

    var usrCo = document.createElement('li');
    usrCo.className = 'user';
    usrCo.innerHTML = userName + ' has joined the chat';
    document.getElementById('messages').appendChild(usrCo);
});

socket.on('chat message', function(messageObj){
    console.log('chat message received client side');

    printChat(messageObj);
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
