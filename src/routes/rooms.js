const express = require("express")
const Route = express.Router()
const CtrlRooms = require("../controllers/rooms")

Route.post("/", CtrlRooms.create)

module.exports = Route
