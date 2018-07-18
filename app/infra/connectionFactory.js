var mysql = require('mysql');

function createDBConnection(){
    return mysql.createConnection({
        port : 3307,
        host : 'localhost',
        user : 'root',
        password : 'root',
        database : 'bem_estar'
    });
}

module.exports = function(){
    return createDBConnection;
}
