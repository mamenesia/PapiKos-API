
const express = require('express')
const cors = require('cors')
const app = express()
const Route = express.Router()
const verify = require('../middleware/verifyToken')
const PartnerController = require('../controllers/partner')
const { multerUploads } = require("../middleware/multer")

app.use(cors())
Route.get("/", multerUploads, PartnerController.getPartners)
  .get("/show/:id", multerUploads, PartnerController.getAPartner)
  .patch("/:id", multerUploads, PartnerController.updatePartner)
  .delete("/:id", multerUploads, PartnerController.deletePartner)

module.exports = Route
