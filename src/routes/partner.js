const express = require('express')
const cors = require('cors')
const app = express()
const Route = express.Router()
const verify = require('../middleware/verifyToken')
const PartnerController = require('../controllers/partner')

app.use(cors())
Route.get('/', PartnerController.getPartners)
	.get('/show/:id', PartnerController.getAPartner)
	.patch('/:id', PartnerController.updatePartner)
	.delete('/:id', PartnerController.deletePartner)

module.exports = Route
