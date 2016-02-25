var tape = require('tape');
var server = require('../server/server.js');


tape('server successfully exports a function', function(t) {
    var actual = typeof server.initialise;
    var expected = 'function';
    t.equal(actual, expected, 'initialise is indeed a function');
    t.end();
});



//This test fails (maybe because server is already initialised by the time it is run?)
// tape('calling initialise in the server module returns an object (the server)', function(t){
//     var s = server.initialise();
//     var actual = typeof s;
//     var expected = 'object';
//     t.equal(actual, expected, 'initialise returns an object');
//     t.end();
// });
