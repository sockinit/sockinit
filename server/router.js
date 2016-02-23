var handler = require('./handler.js');

function router(request, response){
    var url = request.url;
    if(url === '/'){
        response.writeHead(200, {'Content-Type':'text/html'});
        response.end();
    }
}

module.exports = router;
