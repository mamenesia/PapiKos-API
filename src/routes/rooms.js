const express = require("express")
const Route = express.Router()
const CtrlRooms = require("../controllers/rooms")
const { multerUploads } = require("../middleware/multer")

Route.get("/", multerUploads, CtrlRooms.getAllRoom)
  .get("/:id", multerUploads, CtrlRooms.getRoomById)
  .post("/", multerUploads, CtrlRooms.create)
  .patch("/:id", multerUploads, CtrlRooms.edit)
  .delete("/:id", multerUploads, CtrlRooms.delete)

module.exports = Route
