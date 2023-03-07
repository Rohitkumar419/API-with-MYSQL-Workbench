var mysql = require("mysql");

var connection = mysql.createConnection({
    host: '127.0.0.1',
    database: 'control_tower',
    user: 'root',
    password: 'rohit@123',
    connectionLimit: 10,
});

module.exports = connection;



















// const mysql = require('mysql')
// const connection = mysql.createConnection({
//     host: 'localhost',
//     database: 'control_tower',
//     user: 'root',
//     password: 'Rohitkum@r123'
// })

// module.exports = connection
