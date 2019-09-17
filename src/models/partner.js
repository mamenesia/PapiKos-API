const conn = require('../config/db');

module.exports = {
	getPartners: () => {
		return new Promise((resolve, reject) => {
			conn.query('SELECT * FROM partner', (err, result) => {
				if (!err) {
					resolve(result);
				} else {
					reject(err);
				}
			});
		});
	},
	getAPartner: id => {
		return new Promise((resolve, reject) => {
			conn.query('SELECT * FROM partner WHERE id = ?', id, (err, result) => {
				if (!err) {
					resolve(result);
				} else {
					reject(err);
				}
			});
		});
	},
	updatePartner: (data, id) => {
		return new Promise((resolve, reject) => {
			conn.query(
				'UPDATE partner SET ? WHERE id = ?',
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
	deletePartner: id => {
		return new Promise((resolve, reject) => {
			conn.query('DELETE FROM partner WHERE id = ?', id, (err, result) => {
				if (!err) {
					resolve(result);
				} else {
					reject(err);
				}
			});
		});
	}
};
