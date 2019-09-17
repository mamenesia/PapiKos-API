const express = require('express');
const cors = require('cors');
const app = express();
const Route = express.Router();
const verify = require('../middleware/verifyToken');
const UserController = require('../controllers/user');

app.use(cors());
Route.get('/', UserController.getUsers)
	.get('/show/:id', UserController.getAUser)
	.patch('/:id', UserController.updateUser)
	.delete('/:id', UserController.deleteUser);

module.exports = Route;
