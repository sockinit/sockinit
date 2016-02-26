var tape = require('tape');
var app = require('../server/app.js');
var shot = require('shot');
var client = require('../server/client.js');

tape('app.js exports correct objects', function(t){
    t.equal(typeof app.io, 'object', 'io object is returned');
    t.equal(typeof app.handler, 'function', 'handler function is returned');
    t.equal(typeof app.server, 'object', 'server object is returned');
    t.end();
});

tape('Wrong endpoint returns a 404', function(t){
    shot.inject(app.handler, { method: 'GET', url: '/nothing' }, function(res){
        t.equal(res.statusCode, 404, 'page not recognised');
        t.end();
    });

});

tape('200 response received from various urls localhost:3000/', function(t) {
    shot.inject(app.handler, { method: 'GET', url: '/' }, function(res){
        t.equal(res.statusCode, 200, 'server is there!');
    });
    shot.inject(app.handler, { method: 'GET', url: '/username/test' }, function(res){
        t.equal(res.statusCode, 200, '/username endpoint is recognised!');
    });
    shot.inject(app.handler, { method: 'GET', url: 'style.css' }, function(res){
        t.equal(res.statusCode, 200, '/client/style.css endpoint is recognised!');
    });
    shot.inject(app.handler, { method: 'GET', url: '/test.test' }, function(res){
        t.equal(res.statusCode, 404, 'non existing endpoint containing a . returns 404');
        t.end();
    });

});



tape.onFinish(function(){
    app.server.close();
    client.quit();
});
