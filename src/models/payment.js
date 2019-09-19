const conn = require('../config/db')

module.exports = {
	getPayments: () => {
		return new Promise((resolve, reject) => {
			conn.query('SELECT * FROM payment', (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	},
	getAPayment: id => {
		return new Promise((resolve, reject) => {
			conn.query('SELECT * FROM payment WHERE id = ?', id, (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	},
	createPayment: data => {
		return new Promise((resolve, reject) => {
			conn.query('INSERT payment SET ?', data, (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	},
	updatePayment: (data, id) => {
		return new Promise((resolve, reject) => {
			conn.query(
				'UPDATE payment SET ? WHERE bookid = ?',
				[data, id],
				(err, result) => {
					if (!err) {
						resolve(result)
					} else {
						reject(err)
					}
				}
			)
		})
	},
	deletePayment: id => {
		return new Promise((resolve, reject) => {
			conn.query('DELETE FROM payment WHERE id=?', id, (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	}
}
