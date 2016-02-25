var http = require('http');
var fs = require('fs');
var port = process.env.PORT || 3000;

var server = http.createServer(handler);
server.listen(port);
console.log('server listening on: ' + port);

var io = require("socket.io")(server);

function handler (request, response){
    var url = request.url;
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
    } else if (url.indexOf(".") > -1) {
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
