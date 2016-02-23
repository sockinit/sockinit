var tape = require('tape');
var app = require('../server/app.js');
var shot = require('shot');
var router = require('../server/router.js');

tape('app.js exports the server object', function(t){
    t.equal(typeof app.s, 'object', 'server object is returned');
    t.end();
});

tape('200 response received from the url localhost:3000/', function(t) {
    shot.inject(router, { method: 'GET', url: '/' }, function(res){
        t.equal(res.statusCode, 200, 'server is there!');
        t.end();
    });
});

tape.onFinish(function(){
    app.s.close();
});
