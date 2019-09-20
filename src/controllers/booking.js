require("dotenv").config()
const modelBooking = require("../models/booking")

module.exports = {
  getBookings: (req, res) => {
    modelBooking
      .getBookings()
      .then(result => {
        res.send({
          status: 200,
          message: "All Booking details are successfully retrieved!",
          result
        })
      })
      .catch(err => console.log(err))
  },
  getABooking: (req, res) => {
    const id = req.params.id
    modelBooking
      .getABooking(id)
      .then(result => {
        if (result[0] === undefined) {
          return res.status(400).send({
            status: 400,
            message: "Booking data does not exist!"
          })
        } else {
          return res.send({
            status: 200,
            id,
            message: "Booking data has been successfully retrieved!",
            result
          })
        }
      })
      .catch(err => console.log(err))
  },
  createBooking: (req, res) => {
    const data = {
      id_partner: req.body.id_partner,
      id_user: req.body.id_user,
      room_id: req.body.room_id,
      status: "Pending",
      price: req.body.price,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    }
    modelBooking
      .createBooking(data)
      .then(result => {
        res.send({
          status: 200,
          message: "Booking is successfully added",
          booking: {
            id_partner: req.body.id_partner,
            id_user: req.body.id_user,
            room_id: req.body.room_id,
            status: "Pending",
            price: req.body.price,
            startDate: req.body.startDate,
            endDate: req.body.endDate
          }
        })
      })
      .catch(err => console.log(err))
  },
  updateBooking: (req, res) => {
    const id = req.params.id
    const data = {
      status: "Paid"
    }

    modelBooking
      .getABooking(id)
      .then(result => {
        if (result.length !== 0) {
          return modelBooking.updateBooking(data, id).then(result => {
            res.send({
              status: 200,
              message: "Booking data has been updated!",
              id,
              data
            })
          })
        } else {
          return res.status(400).send({
            status: 400,
            id,
            message: "Booking data does not exist!"
          })
        }
      })
      .catch(err => console.log(err))
  },
  deleteBooking: (req, res) => {
    const id = req.params.id
    modelBooking
      .getABooking(id)
      .then(result => {
        if (result.length !== 0) {
          return modelBooking.deleteBooking(id).then(result => {
            res.send({
              status: 200,
              id,
              message: "Booking data has been deleted"
            })
          })
        } else {
          return res.status(400).send({
            status: 400,
            id,
            message: "Booking data does not exist"
          })
        }
      })
      .catch(err => console.log(err))
  },
  getHistory: (req, res) => {
    const paramUrl = {
      id_user: req.query.id_partner,
      id_booking: req.query.id_booking
    }
    modelBooking
      .getHistory(paramUrl)
      .then(result => {
        res.send({
          status: 200,
          message: "All Booking details are successfully retrieved!",
          result
        })
      })
      .catch(err => console.log(err))
  },
  getAHistory: (req, res) => {
    const id = req.params.id
    modelBooking
      .getAHistory(id)
      .then(result => {
        if (result[0] === undefined) {
          return res.status(400).send({
            status: 400,
            message: "Booking data does not exist!"
          })
        } else {
          return res.send({
            status: 200,
            id,
            message: "Booking data has been successfully retrieved!",
            result
          })
        }
      })
      .catch(err => console.log(err))
  }
}
