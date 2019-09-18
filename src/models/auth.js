const conn = require('../config/db')

module.exports = {
	registerUser: data => {
		return new Promise((resolve, reject) => {
			conn.query('INSERT user SET ?', data, (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	},
	registerPartner: data => {
		return new Promise((resolve, reject) => {
			conn.query('INSERT partner SET ?', data, (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	},
	loginUser: data => {
		return new Promise((resolve, reject) => {
			conn.query(
				'SELECT * FROM user WHERE username= ? ',
				data.username,
				(err, result) => {
					if (!err) {
						resolve(result)
					} else {
						reject(result)
					}
				}
			)
		})
	},
	loginPartner: data => {
		return new Promise((resolve, reject) => {
			conn.query(
				'SELECT * FROM partner WHERE email= ? ',
				data.email,
				(err, result) => {
					if (!err) {
						resolve(result)
					} else {
						reject(result)
					}
				}
			)
		})
	},
	registerUserCheck: data => {
		return new Promise((resolve, reject) => {
			conn.query(
				`SELECT * FROM user WHERE username=? OR email=?`,
				[data.username, data.email],
				(err, result) => {
					if (!err) {
						resolve(result)
					} else {
						reject(result)
					}
				}
			)
		})
	},
	registerPartnerCheck: data => {
		return new Promise((resolve, reject) => {
			conn.query(
				'SELECT * FROM partner WHERE labelName=? OR email=?',
				[data.labelName, data.email],
				(err, result) => {
					if (!err) {
						resolve(result)
					} else {
						reject(err)
					}
				}
			)
		})
	}
}
