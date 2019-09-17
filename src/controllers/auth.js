require('dotenv').config();

const modelAuth = require('../models/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
	registerUser: (req, res) => {
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
		modelAuth.registerUserCheck(data).then(result => {
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
				return res.status(400).send({
					status: 400,
					message: 'Username or Email already registered!'
				});
			}
		});
	},
	registerPartner: (req, res) => {
		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(req.body.password, salt);

		const data = {
			fullname: req.body.fullname,
			labelName: req.body.labelName,
			phone: req.body.phone,
			email: req.body.email,
			password: hashedPassword,
			photo:
				'https://cdn2.iconfinder.com/data/icons/free-basic-icon-set-2/300/2-512.png',
			address: req.body.address,
			latitude: req.body.latitude,
			longitude: req.body.longitude,
			id_location: req.body.id_location
		};

		modelAuth.registerUserCheck(data).then(result => {
			if (result.length === 0) {
				return modelAuth
					.registerPartner(data)
					.then(result => {
						res.send({
							status: 200,
							message: 'Partner successfully registered!',
							partner: {
								fullname: req.body.fullname,
								username: req.body.username,
								phone: req.body.phone,
								email: req.body.email
							}
						});
					})
					.catch(err => console.log(err));
			} else {
				return res.status(400).send({
					status: 400,
					message: 'Username or Email already registered!'
				});
			}
		});
	},
	loginUser: (req, res) => {
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
					return res.status(400).send({
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
				res.status(400).send({
					status: 400,
					message: 'Username does not exist',
					err
				});
			});
	},
	loginPartner: (req, res) => {
		const data = {
			email: req.body.email,
			password: req.body.password
		};

		modelAuth
			.loginPartner(data)
			.then(result => {
				const validPassword = bcrypt.compareSync(
					req.body.password,
					result[0].password
				);
				if (!validPassword) {
					return res.status(400).send({
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
					email: req.body.email,
					password: req.body.password,
					token
				});
			})
			.catch(err => {
				res.status(400).send({
					status: 400,
					message: 'Username does not exist',
					err
				});
			});
	}
};
