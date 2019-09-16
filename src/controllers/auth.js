require('dotenv').config();

const modelAuth = require('../models/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {
	registerValidation,
	loginValidation
} = require('../middleware/validation');

module.exports = {
	registerUser: (req, res) => {
		// Validate user data
		const { error } = registerValidation(req.body);
		if (error) {
			return res.send({
				status: 400,
				message: error.details[0].message
			});
		}

		// Hash the password
		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(req.body.password, salt);

		// if register data valid, proceed to insert user data to db
		const data = {
			fullname: req.body.fullname,
			username: req.body.username,
			photo:
				'https://upload.wikimedia.org/wikipedia/commons/6/67/User_Avatar.png',
			phone: req.body.phone,
			email: req.body.email,
			password: hashedPassword
		};

		// Check username or email already exist
		modelAuth.registerCheck(data).then(result => {
			if (result.length === 0) {
				return modelAuth
					.registerUser(data)
					.then(result => {
						res.send({
							status: 200,
							message: 'User successfully registered!',
							user: {
								fullname: req.body.fullname,
								username: req.body.username,
								phone: req.body.phone,
								email: req.body.email
							}
						});
					})
					.catch(err => console.log(err));
			} else {
				return res.send({
					status: 400,
					message: 'Username or Email already registered!'
				});
			}
		});
	},
	loginUser: (req, res) => {
		const { error } = loginValidation(req.body);
		if (error) {
			return res.send({
				status: 400,
				message: error.details[0].message
			});
		}
		const data = {
			username: req.body.username,
			password: req.body.password
		};

		modelAuth
			.loginUser(data)
			.then(result => {
				const validPassword = bcrypt.compareSync(
					req.body.password,
					result[0].password
				);
				if (!validPassword) {
					return res.send({
						status: 400,
						message: 'Wrong Password!'
					});
				}
				const token = jwt.sign(
					{
						id: result[0].id,
						username: result[0].username
					},
					process.env.TOKEN_SECRET,
					{
						expiresIn: '10h'
					}
				);
				res.send({
					status: 200,
					message: 'Login successfully!',
					username: result.username,
					password: result.password,
					token
				});
			})
			.catch(err => {
				res.send({
					status: 400,
					message: 'Username does not exist'
				});
			});
	}
};
