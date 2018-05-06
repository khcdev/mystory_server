const mysql = require('mysql');

const dbConfig = {
    host : 'mystorydb.cqxl7xdulpip.ap-northeast-2.rds.amazonaws.com',
	user : 'user',
	password : 'user1234',
	port : 3306,
	database : 'my_story',
    connectionLimit: 3,
    waitForConnections:false
};

const dbPool = mysql.createPool(dbConfig);

module.exports = dbPool;
