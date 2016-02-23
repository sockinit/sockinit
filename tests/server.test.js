//var server =

var tape = require('tape');
var server = require('../server/server.js');

tape('server successfully exports function initialise, which initialises the server', function(t) {
    var actual = typeof server;
    var expected = 'object';
    t.equal(actual, expected, 'initialise is indeed a function');
    t.end();
});






//export the server
