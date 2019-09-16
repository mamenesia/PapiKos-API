require('dotenv').config();
const modelUser = require('../models/user');

module.exports = {
	getUsers: (req, res) => {
		modelUser
			.getUsers()
			.then(result => {
				res.send({
					status: 200,
					message: 'All Users are successfully fetched!',
					result
				});
			})
			.catch(err => console.log(err));
	},
	getAUser: (req, res) => {
		const id = req.params.id;
		modelUser
			.getAUser(id)
			.then(result => {
				if (result[0] === undefined) {
					return res.send({
						status: 400,
						message: "The user doesn't exist"
					});
				} else {
					return res.send({
						status: 200,
						id: id,
						message: 'The user data is successfully retrieved',
						result
					});
				}
			})
			.catch(err => console.log(err));
	},
	updateUser: (req, res) => {
		const id = req.params.id;
		const data = {
			fullname: req.body.fullname,
			username: req.body.username,
			photo:
				'https://upload.wikimedia.org/wikipedia/commons/6/67/User_Avatar.png',
			phone: req.body.phone,
			email: req.body.email
		};

		modelUser.getAUser(id).then(result => {
			if (result.length !== 0) {
				return modelUser
					.updateUser(data, id)
					.then(result => {
						res.send({
							status: 200,
							message: 'User data has successfully updated',
							id,
							data
						});
					})
					.catch(err => console.log(err));
			} else {
				return res.send({
					status: 400,
					id,
					message: 'User does not exist'
				});
			}
		});
	},
	deleteUser: (req, res) => {
		const id = req.params.id;
		modelUser.getAUser(id).then(result => {
			if (result.length !== 0) {
				return modelUser
					.deleteUser(id)
					.then(result => {
						res.send({
							status: 200,
							id,
							message: 'User has been deleted'
						});
					})
					.catch(err => console.log(err));
			} else {
				return res.send({
					status: 400,
					id,
					message: 'Book does not exist'
				});
			}
		});
	}
};
