var mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'database-1.cdfivukvrchj.us-east-1.rds.amazonaws.com',
    database: 'control_tower',
    user: 'admin',
    password: 'Admin123#',
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
