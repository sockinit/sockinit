
        var socket = io();
        var usrInpt = document.getElementById('input');
        document.getElementById('button').addEventListener('click', function(e){
            socket.emit('chat message',usrInpt.value);
            usrInpt.value = '';
            return false;
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
            var usrTyp = document.createElement('li');
            usrTyp.innerHTML = 'A user is typing';
            document.getElementById('messages').appendChild(usrTyp);
        });
