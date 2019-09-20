const conn = require("../config/db")
const joinQuery =
  "SELECT booking.id, partner.id AS partner_id, user.id AS id_user, room.id AS room_id, booking.status, booking.startDate, booking.endDate, booking.bookingDate FROM booking, partner, user, room WHERE partner.id=booking.id_partner AND user.id=booking.id_user AND room.id=booking.room_id"

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
      conn.query("INSERT booking SET ?", data, (err, result) => {
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
        "UPDATE booking SET ? WHERE id = ?",
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
      conn.query("DELETE FROM booking WHERE id = ?", id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  getHistory: () => {
    return new Promise((resolve, reject) => {
      conn.query(
        `select booking.id, payment.amount, payment.bank, payment.status, booking.id_user,user.fullname, partner.fullname, partner.labelName from booking inner join payment on booking.id = payment.bookid inner JOIN user on booking.id_user = user.id inner JOIN partner on booking.id_partner = partner.id`,
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
  getAHistory: id => {
    return new Promise((resolve, reject) => {
      conn.query(
        `select booking.id, payment.amount, payment.bank, payment.status, booking.id_user, user.fullname, partner.fullname, partner.labelName from booking inner join payment on booking.id = payment.bookid inner JOIN user on booking.id_user = user.id inner JOIN partner on booking.id_partner = partner.id WHERE booking.id_user=?`,
        id,
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
