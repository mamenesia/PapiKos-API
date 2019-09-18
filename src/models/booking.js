const conn = require('../config/db')
const joinQuery =
	'SELECT booking.id, partner.id AS partner_id, user.id AS id_user, room.id AS room_id, booking.status, booking.startDate, booking.endDate, booking.bookingDate FROM booking, partner, user, room WHERE partner.id=booking.id_partner AND user.id=booking.id_user AND room.id=booking.room_id'

module.exports = {
	getBookings: () => {
		return new Promise((resolve, reject) => {
			conn.query(`${joinQuery}`, (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	},
	getABooking: id => {
		return new Promise((resolve, reject) => {
			conn.query(`${joinQuery} AND booking.id=?`, id, (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	},
	createBooking: data => {
		return new Promise((resolve, reject) => {
			conn.query('INSERT booking SET ?', data, (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	},
	updateBooking: (data, id) => {
		return new Promise((resolve, reject) => {
			conn.query(
				'UPDATE booking SET ? WHERE id = ?',
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
	deleteBooking: id => {
		return new Promise((resolve, reject) => {
			conn.query('DELETE FROM booking WHERE id = ?', id, (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	}
}
