const express = require("express")
const cors = require("cors")
const app = express()
const Route = express.Router()
const verify = require("../middleware/verifyToken")
const BookingController = require("../controllers/booking")

app.use(cors())
Route.get("/", BookingController.getBookings)
  .get("/show/:id", BookingController.getABooking)
  .post("/", BookingController.createBooking)
  .patch("/:id", BookingController.updateBooking)
  .delete("/:id", BookingController.deleteBooking)
  .get("/history", BookingController.getHistory)
  .get("/history/:id", BookingController.getAHistory)

module.exports = Route
