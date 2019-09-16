require('dotenv').config();

const mysql = require('mysql');

const conn = mysql.createPool({
	host: process.env.DB_HOST, // || 'remotemysql.com',
	user: process.env.DB_USER, // || 'JrWbkyWP2B',
	password: process.env.DB_PASSWORD, // || 'B8VXTpyAVH',
	database: process.env.DB_NAME // || 'JrWbkyWP2B'
});

module.exports = conn;
