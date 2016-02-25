var http = require('http');
var fs = require('fs');
var port = process.env.PORT || 3000;
var userdb = require('./userdb.js');
var client = require('./client.js');

var server = http.createServer(handler);

server.listen(port);

console.log('server listening on: ' + port);

var io = require("socket.io")(server);

function handler (request, response){
    var url = request.url;
    console.log('url--------->', url);
    if(url === '/'){
        response.writeHead(200, {'Content-Type':'text/html'});
        fs.readFile(__dirname + '/../client/index.html', function(err, file){
            if(err){
                console.log(err);
                response.end();
            } else {
                response.end(file);
            }
        });
        // for new sockers
    } else if (url.indexOf("username") > -1) {
        // grab the username
        var name = url.split('/')[2];
        response.writeHead(200, {'Content-Type':'text/html'});
        // callback to checkName function
        userdb.fetchUserNames(client, function(reply){
            var userAvailable = userdb.checkName(client, reply, name);
            if(!userAvailable) {
                userdb.addUsertoUserSet(client, name, function(reply) {
                    console.log('repply----------->',reply);
                });
            }
            // console.log('userAvailable--------->', userAvailable.toString('utf8'));
            response.end(userAvailable.toString('utf8'));
        });
    }
    // else if (url.indexOf("chatting") > -1) {
    //     response.writeHead(200, {'Content-Type':'text/html'});
    // }
    else if (url === '/chatting/style.css') {
        fs.readFile(__dirname + '/../client/style.css', function(err, file) {
            if (err) {
                console.log(err);
                response.end();
            } else {
                console.log('url in css branch ------>',  url);
                response.writeHead(200, {'Content-Type':'text/css'});
                response.end(file);
            }
        });
    }
    else if (url === '/chatting/chatting.js') {
        fs.readFile(__dirname + '/../client/chatting.js', function(err, file) {
            if (err) {
                console.log(err);
                response.end();
            } else {
                console.log('url in css branch ------>',  url);
                response.writeHead(200, {'Content-Type':'text/js'});
                response.end(file);
            }
        });
    }
    else if (url.indexOf("chatting") > -1) {
        fs.readFile(__dirname + '/../client/chatting.html', function(err, file) {
            if (err) {
                console.log(err);
                response.end();
            } else {
                console.log('url in branch ------>',  url);
                response.writeHead(200, {'Content-Type':'text/html'});
                response.end(file);
            }
        });
    }
    else if (url.indexOf(".") > -1) {
            var ext = url.split(".")[1];
            fs.readFile(__dirname + '/../client/' + url, function(err, file) {
                if(err){
                    console.log(err);
                    response.end();

                } else {
                    response.writeHead(200, {'Content-Type':'text/' + ext});
                    response.end(file);
                }
            });
    }
}

module.exports = {
    server: server,
    io: io
};

var chatDb = require("./chatdb.js");
