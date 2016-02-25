// global variable for chatting.js access
var userName;

document.getElementById("button").addEventListener('click', function(e) {
    e.preventDefault();
    var username = document.getElementById('input').value;
    console.log(username);
    sendNameToBackEnd(username);
});

function sendNameToBackEnd(name) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            console.log(request.response, request.responseText);
            if(request.responseText === 'false') {
                userName = name;
                console.log('in func user', userName);
                var successEl = document.createElement('h2');
                successEl.innerHTML = 'Success, get Socking!';
                document.body.appendChild(successEl);
                setTimeout(function(){
                    document.getElementById('link').click();
                }, 2000);
            }
            else {
                var sorryEl = document.createElement('h2');
                sorryEl.innerHTML = 'Sorry, username already taken. Try again.';
                document.body.appendChild(sorryEl);
            }
        }
    };
    request.open("GET", "/username/" + name, true);
    request.send();
}
