var http = require('http');
var port = process.env.PORT || 3000;
//var server =

//export the server

function initialise (router, port){
    var server = http.createServer(router).listen(port);
    console.log('server listening on: ' + port);
    return server;
}

module.exports = {
    initialise: initialise,
    port: port
};
