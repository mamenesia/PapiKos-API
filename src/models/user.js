const conn = require('../config/db');

module.exports = {
	getUsers: () => {
		return new Promise((resolve, reject) => {
			conn.query('SELECT * FROM user', (err, result) => {
				if (!err) {
					resolve(result);
				} else {
					reject(err);
				}
			});
		});
	},
	getAUser: id => {
		return new Promise((resolve, reject) => {
			conn.query('SELECT * FROM user WHERE id = ?', id, (err, result) => {
				if (!err) {
					resolve(result);
				} else {
					reject(err);
				}
			});
		});
	},
	updateUser: (data, id) => {
		return new Promise((resolve, reject) => {
			conn.query(
				'UPDATE user SET ? WHERE id = ?',
				[data, id],
				(err, result) => {
					if (!err) {
						resolve(result);
					} else {
						reject(err);
					}
				}
			);
		});
	},
	deleteUser: id => {
		return new Promise((resolve, reject) => {
			conn.query('DELETE FROM user WHERE id = ?', id, (err, result) => {
				if (!err) {
					resolve(result);
				} else {
					reject(err);
				}
			});
		});
	}
};
