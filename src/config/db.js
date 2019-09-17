require('dotenv').config();

const mysql = require('mysql');

const conn = mysql.createPool({
	host: process.env.DB_HOST, // || 'remotemysql.com',
	user: process.env.DB_USER, // || 'dh8MEUlvwU',
	password: process.env.DB_PASSWORD, // || 'QihovEStU1',
	database: process.env.DB_NAME // || 'dh8MEUlvwU'
});

module.exports = conn;
