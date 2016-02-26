// global variable for chatting.js access
var userName;


document.getElementById("button").addEventListener('click', function(e) {
    e.preventDefault();
    var username = document.getElementById('input').value;
    if (username !== '') {
        console.log(username);
        document.getElementById('input').value = '';
        sendNameToBackEnd(username);
    }
});

document.getElementById("input").addEventListener('keyup', function(e) {
    if (e.keyCode === 13) {
        var username = document.getElementById('input').value;
        if (username !== '') {
            console.log(username);
            document.getElementById('input').value = '';
            sendNameToBackEnd(username);
        }
    }
});

var sorryEl = document.createElement('h2');
sorryEl.className = "sorry";

function sendNameToBackEnd(name) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {

        if (request.readyState === 4 && request.status === 200) {
            console.log(request.response, request.responseText);

            if (request.responseText === 'false') {
                userName = name;
                console.log('in func user', userName);

                var userLink = document.createElement('a');
                userLink.href = "/chatting/" + userName;
                userLink.id = 'link';
                document.body.appendChild(userLink);

                var successEl = document.createElement('h2');
                successEl.className = "success";
                successEl.innerHTML = 'Success, get Socking!';
                document.body.appendChild(successEl);
                setTimeout(function() {
                    document.getElementById('link').click();
                }, 2000);
            } else if (sorryEl.innerHTML.length === 0) {
                sorryEl.innerHTML = 'Sorry, username already taken. Try again.';
                document.body.appendChild(sorryEl);
            }
        }
    };
    request.open("GET", "/username/" + name, true);
    request.send();
}

document.getElementById("rebutton").addEventListener('click', function(e) {
    e.preventDefault();
    var username = document.getElementById('reinput').value;
    if (username !== '') {
        console.log(username);
        document.getElementById('reinput').value = '';
        reSendNameToBackEnd(username);
    }
});

document.getElementById("reinput").addEventListener('keyup', function(e) {
    if (e.keyCode === 13) {
        var username = document.getElementById('reinput').value;
        if (username !== '') {
            console.log(username);
            document.getElementById('reinput').value = '';
            reSendNameToBackEnd(username);
        }
    }
});

var reSorryEl = document.createElement('h2');

function reSendNameToBackEnd(name) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            console.log(request.response, request.responseText);
            if (request.responseText === 'true') {
                userName = name;
                console.log('in refunc user', userName);

                var userLink = document.createElement('a');
                userLink.href = "/chatting/" + userName;
                userLink.id = 'link';
                document.body.appendChild(userLink);

                var successEl = document.createElement('h2');
                successEl.innerHTML = 'Success, get Socking!';
                document.body.appendChild(successEl);
                setTimeout(function() {
                    document.getElementById('link').click();
                }, 2000);
            } else if (reSorryEl.innerHTML.length === 0) {
                reSorryEl.innerHTML = 'Sorry, we can\'t find your username. Try again.';
                document.body.appendChild(reSorryEl);
            }
        }
    };
    request.open("GET", "/existingname/" + name, true);
    request.send();
}
