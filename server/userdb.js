// var client = require('./client.js');

//TODO add more key/value pairs?

function addUsertoUserSet(client, username, callback) {
    console.log('function is running');
    client.sadd('users', username, function(err, reply) {
        if (err) {
            console.log(err);
        } else {
            console.log('reply -------->', reply);
            return callback(reply);
        }
    });
}

function addUser(client, usernameKey, username, passwordKey, password, callback) {
    client.hmset(username, usernameKey, username, passwordKey, password,
        function(err, reply) {
            if (err) {
                console.log(err);
            } else {
                console.log(reply);
                return callback(reply);
            }
        });
}

function fetchUserNames(client, callback) {
    console.log('client ------>', client);
    client.smembers('users', function(err, reply) {
        if (err) {
            console.log(err);
        } else {
            console.log(reply);
            return callback(reply);
        }
    });
}


function checkName(client, userArray, nameToBeChecked) {
        if (userArray.indexOf(nameToBeChecked) > -1) {
            return true;
        } else {
            return false;
        }
}




module.exports = {
    addUser: addUser,
    addUsertoUserSet: addUsertoUserSet,
    fetchUserNames: fetchUserNames,
    checkName: checkName
};
