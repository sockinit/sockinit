var server = require('./server.js');
var router = require('./router.js');

var s = server.initialise(router);

module.exports = {
    s: s
};
