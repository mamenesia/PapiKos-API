const express = require("express")
const cors = require("cors")
const app = express()
const Route = express.Router()
const verify = require("../middleware/verifyToken")
const UserController = require("../controllers/user")
const { multerUploads } = require("../middleware/multer")

app.use(cors())
Route.get("/", multerUploads, UserController.getUsers)
  .get("/show/:id", multerUploads, UserController.getAUser)
  .patch("/:id", multerUploads, UserController.updateUser)
  .delete("/:id", multerUploads, UserController.deleteUser)

module.exports = Route
