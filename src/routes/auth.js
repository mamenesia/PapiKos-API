const express = require('express');
const Route = express.Router();
const AuthController = require('../controllers/auth');

Route.get('/', (req, res) => {
	res.json({
		message: 'Welcome to PapiKost API',
		login: 'If you already have an account, please login',
		register: 'Register your account today to use Papikost API'
	});
})
	.post('/register', AuthController.registerUser)
	.post('/login', AuthController.loginUser);

module.exports = Route;
