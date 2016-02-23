var http = require('http');
var port = process.env.PORT || 3000;


function initialise (router){
    var server = http.createServer(router).listen(port);
    console.log('server listening on: ' + port);
    console.log(typeof server);
    return server;
}

module.exports = {
    initialise: initialise
};
